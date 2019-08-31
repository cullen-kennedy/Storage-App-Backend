
import pool from '../dbconnection';
import * as SQL from '../sqlStore'

export default class Item {
    constructor(data) {
        
        this.id = data.id
        this.name = data.name
        this.dateEntered = data.date_entered
        this.containerId = data.container_id,
        this.containerName = data.container_name
    }

    static async findAll(itemResourceParameters) {

        //If itemResourceParameters are null, search all items
        if (itemResourceParameters !== null) {
            //add wildcards %search%
            var search = "%" + itemResourceParameters.search + "%"
            
            try{
                var response = await pool.execute(SQL.findAllItemsWithSearch, [search])

                var resultJson = JSON.stringify(response[0]);
                resultJson = JSON.parse(resultJson);
                
                var itemList = new Array();
                resultJson.forEach((resource) => {
                    itemList.push(new this(resource))
                })

                return [200, itemList] 
            }catch (err) {
                return [500, err]
            }  
        }
        else {
            
            try{
                var response = await pool.execute(SQL.findAllItems)

                var resultJson = JSON.stringify(response[0]);
                resultJson = JSON.parse(resultJson);
                
                var itemList = new Array();
                resultJson.forEach((resource) => {
                    itemList.push(new this(resource))
                })

                return [200, itemList] 
            }
            catch (err) {
                console.error(err.message)
                return [500, {Message: "Error finding all items"}]
            }  
        }
        
        
    }       
}
