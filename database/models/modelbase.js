import pool from '../dbconnection';
import { createBrotliCompress } from 'zlib';
import { callbackify } from 'util';

export default class ModelBase {
    constructor() {
        
    }

    static async findAll() {
        
        var name = this.getResourceName();

            try {
                const response = await pool.query(`SELECT * FROM ${name}`)
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

    static async findById(id) {
        var name = this.getResourceName()
        console.log(id)
        try {
            const response = await pool.query(`SELECT * FROM ${name} WHERE id = ?`, [id])
            var resultJson = JSON.stringify(response[0][0]);
    
            resultJson = JSON.parse(resultJson);
    
            if (resultJson.length === 0) {
                return [404, null]
            }
            else {
                var model = new this(resultJson)
            }
        return [null, model]  
        }
        catch(e) {
            console.error(e)
            return [500, null]
        }

    }

    static getResourceName() {
        if (this.name === "Model") {
            throw new Error("Model is not initialized");
        }
        switch(this.name) {
            case "Category" : return "categories"
            case "Item" : return "items" 
            case "Container" : return "containers"
        }
        
    }
}