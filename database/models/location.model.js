
import pool from '../dbconnection';
import * as SQL from '../sqlStore'

export default class Location {
    constructor(data) {
        this.id = data.id
        this.name = data.name
    }

    static async getLocations() {

        try {
             var response = await pool.execute(SQL.getLocations)
             var resultJson = JSON.stringify(response[0]);
             resultJson = JSON.parse(resultJson);
            
            var itemList = new Array();
            resultJson.forEach((resource) => {
                itemList.push(new this(resource))
            })

            return [200, itemList] 
        }catch (err) {
            console.error(err.message)
            return [500, {Message: "Error getting container by id"}]
        }      
    }       
}
