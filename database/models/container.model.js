
import pool from '../dbconnection';
import * as SQL from '../sqlStore'

export default class Container {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.date_entered = data.date_entered
        this.category_name = data.category_name
        this.location_name = data.location_name
    }


    static async getContainerById(id) {
        try{
 
            const response = await pool.execute(SQL.getContainerByid, [id])
            if (!response[0][0]) {
               return [404, {Message: "Container not found"}]
            }

            let resultJson = JSON.stringify(response[0][0]);
            resultJson = JSON.parse(resultJson);

            let containerToReturn = new this(resultJson)

            return [200, containerToReturn] 
    
        }catch (err) {
            console.error(err.message)
            return [500, {Message: "Error getting container by id"}]
        }
    }

    
}




