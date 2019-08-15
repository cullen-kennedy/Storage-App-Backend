import ModelBase from './modelbase'
import pool from '../dbconnection';
import Item from './item'

export default class Container extends ModelBase {
    constructor(data) {
        super()
        this.id = data.id
        this.name = data.name
        this.desc = data.desc
        this.date_created = data.date_created
        this.category_id = data.category_id
    }

    static async getContainerItems(id) {
        try {
            const response = await pool.query(`SELECT *
                                                FROM items i
                                                INNER JOIN containers c 
                                                ON i.container_id = c.id
                                                WHERE c.id = ?`, [id])

            var resultJson = JSON.stringify(response[0]);
    
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
}


