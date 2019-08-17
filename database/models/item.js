
import pool from '../dbconnection';

export default class Item {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.date_entered = data.date_entered
        this.container_name = data.container_name
        this.container_id = data.container_id
    }

    static async getContainerItems(id) {
        try { 
            
            const response = await pool.query(`select
                                                i.id,
                                                i.name,
                                                i.container_id,
                                                c.name as container_name
                                                from
                                                items i, containers c
                                                where
                                                c.id = i.container_id and c.id = ?`, [id])

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

    static async findAll(queryString) {

        try{
            if (queryString === null) {
                var response = await pool.query(`select
                    i.id,
                    i.name,
                    i.container_id,
                    c.name as container_name
                from
                    items i, containers c
                where
                    c.id = i.container_id
                `)
            }
            else {
                var response = await pool.query(`select
                    i.id,
                    i.name,
                    i.container_id,
                    c.name as container_name
                from
                    items i, containers c
                where
                    c.id = i.container_id and i.name = ?
                `, [queryString])
            }
                
            var resultJson = JSON.stringify(response[0]);
    
            resultJson = JSON.parse(resultJson);
    
            var containerList = new Array();
            resultJson.forEach((resource) => {
                containerList.push(new this(resource))
            })
            return [null, containerList]  
        }
        catch(e) {
            console.error(e)
            return [500, null]
        }  
    }
    
}




