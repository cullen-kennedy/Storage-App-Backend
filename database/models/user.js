var db = require('../dbconnection');

const getUser = function(email){
    db.query( `SELECT * FROM users WHERE email = ?`, [email], function(err, results, field){
        if (err) return err
        return results 
    })
}
module.exports.getUserSQL = getUser 