
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

    static async getAllContainers(params) {
        //Will build query here, rather than keep it in sql store
        //Avoids having multiple queries for the filters... like in /items
        let flag = false;
        let filters = []
  
        let query = `select
                        con.id,
                        con.name,
                        con.date_entered,
                        cat.name as category_name,
                        loc.name as location_name
                    from
                        containers con
                    inner join categories cat on con.category_id = cat.id
                    inner join locations loc on loc.id = con.location_id`

        if (params.category) {
            query += ` WHERE cat.name = ?`
            filters.push(params.category)
            flag = true
        }          
        if (params.location) {
            if (flag === true) {
                query += ` and loc.name = ?`
            }
            else {
                query += ` WHERE loc.name = ?`
            }
            filters.push(params.location)
        } 

        try{
            var response = await pool.execute(query, filters)

            var resultJson = JSON.stringify(response[0]);
            resultJson = JSON.parse(resultJson);
            
            var containerList = new Array();
            resultJson.forEach((resource) => {
                containerList.push(new this(resource))
            })

            return [200, containerList] 
        }
        catch (err) {
            console.error(err.message)
            return [500, {Message: "Error finding all items"}]
        }        
    }
    
    static async createContainer(container) {
        try{
            await pool.execute(SQL.createContainer, [container.name, container.date_entered, container.category_id, container.location_id])
            return [201, {Message: "success"}] //Need to add other checks?
        }
        catch(err) {
            console.error(err.message)
            return [500, {Message: "Error creating container"}]
        }
    }
}




