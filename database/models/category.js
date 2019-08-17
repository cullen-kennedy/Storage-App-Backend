import pool from '../dbconnection';

export default class Category {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.date_entered = data.date_entered
    }

    static async findAll() {

        try {
            const response = await pool.query(`select * from categories`)
            var resultJson = JSON.stringify(response[0]);
    
            resultJson = JSON.parse(resultJson);
    
            var categoryList = new Array();
            resultJson.forEach((resource) => {
            categoryList.push(new this(resource))
        })
        return [null, categoryList]  
        }
        catch(e) {
            console.error(e)
            return [500, null]
        }  
    }
}