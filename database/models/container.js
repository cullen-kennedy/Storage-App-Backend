
import pool from '../dbconnection';
import Item from './item'

export default class Container {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.date_entered = data.date_entered
        this.category_id = data.category_id
        this.category_name = data.category_name
    }

    static async getAll() {
        try { 
            //implicit joins
            const response = await pool.query(`select con.id, con.name, con.date_entered, con.category_id, cat.name
                                                from containers con, categories cat
                                                where con.category_id = cat.id`)

            var resultJson = JSON.stringify(response[0]);
            console.log(resultJson)
            resultJson = JSON.parse(resultJson);
           
    
            if (resultJson.length === 0) {
                return [404, null]
            }
            else {
                var itemList = new Array()
                resultJson.forEach((resource) => {
                    itemList.push(new Item(resource))
                })
                return [null, itemList]  
            }
        }
        catch(e) {
            console.error(e)
            return [500, null]
        }
    }


    static async getCategoryContainers(id) {

        try {
            const response = await pool.query(`select con.id, con.name, con.date_entered, cat.id, cat.name
            from containers con, categories cat where cat.id = con.category_id and cat.id = ?`, [id])
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


