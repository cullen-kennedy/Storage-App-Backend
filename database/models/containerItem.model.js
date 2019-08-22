
import pool from '../dbconnection';
import * as SQL from '../sqlStore'

export default class ContainerItem {
    constructor(data) {
        
        this.id = data.id
        this.name = data.name
        this.date_entered = data.date_entered

    }

    static async getContainerItems(id) {
        try { 
            
            const response = await pool.query(SQL.getContainerItems, [id])

            if (response[0].length === 0) {
                return [404, "No Items Found for this container"]
            }
            else {
                var resultJson = JSON.stringify(response[0]);
                resultJson = JSON.parse(resultJson);
                var itemList = new Array()
                resultJson.forEach((resource) => {
                    itemList.push(new this(resource))
                })
                return [null, itemList]  
            }
        }
        catch(err) {
            return [500, err]
        }
    }
}