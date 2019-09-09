import pool from '../dbconnection';

export default class User {
   
/*
const getUser = function(email){
    db.query( `SELECT * FROM users WHERE email = ?`, [email], function(err, results, field){
        if (err) return err
        return results 
    })
}
module.exports.getUserSQL = getUser 
*/

    static async getUser(email) {
        try{
            let response = await pool.execute(`SELECT * FROM users WHERE email = ?`, [email])
            return [201, response] //Need to add other checks?
        }
        catch(err) {
            console.error(err.message)
            return [500, {Message: "Error creating container item"}]
        }
    }

    static async createUser(user) {
        try{
            await pool.execute(`insert into users (name, email, pass) values (?,?,?)`, [user.name, user.email, user.pass])
            return [201, {Message: "success"}] //Need to add other checks?
        }
        catch(err) {
            console.error(err.message)
            return [500, {Message: "Error creating container item"}]
        }
    }
}