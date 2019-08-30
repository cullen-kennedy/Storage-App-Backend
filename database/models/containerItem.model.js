
import pool from '../dbconnection';
import * as SQL from '../sqlStore'

export default class ContainerItem {
    constructor(data) {
        
        this.id = data.id
        this.name = data.name
        this.date_entered = data.date_entered

    }

    static async getContainerItems(params) {
        try { 
            
            const response = await pool.query(SQL.getContainerItems, [params.containerId])

            let resultJson = JSON.stringify(response[0]);
            resultJson = JSON.parse(resultJson);
            let itemList = new Array()
            resultJson.forEach((resource) => {
                itemList.push(new this(resource))
            })
            return [200, itemList]  
            
        }
        catch(err) {
            console.error(err.message)
            return [500, {Message: "Error getting container items"}]
        }
    }

    static async createContainerItem(item) {
        try{
            await pool.execute(SQL.createContainerItem, [item.name, item.date_entered, item.container_id])
            return [201, {Message: "success"}] //Need to add other checks?
        }
        catch(err) {
            console.error(err.message)
            return [500, {Message: "Error creating container item"}]
        }
    }

    static async getContainerItem(params) {
        try{
            const response = await pool.execute(SQL.getContainerItem, [params.itemId, params.containerId])

            if (!response[0][0]) {
                return [404, {Message: "Item with Iid Not Found in this container"}]
            }
            let resultJson = JSON.stringify(response[0][0]);
            resultJson = JSON.parse(resultJson);
            let itemToReturn = new this(resultJson)
            return [200, itemToReturn]
        }
        catch(err) {
            console.error(err.message)
            return [500, {Message: "Error getting container item"}]
        }
    }

}