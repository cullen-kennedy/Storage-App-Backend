import { Mapper } from '../helpers/mappingProfile';
import ContainerItem from '../database/models/containerItem.model'
import Container from '../database/models/container.model'
import ItemForCreationDto from '../dtos/itemforcreationDto'
import ContainerItemResourceParameters from '../helpers/containerItemResourceParameters'

const ContainerItemsController = {

    /**
     * @api {get} containers/:Cid/items Request container items
     * @apiName GetContainerItems
     * @apiGroup ContainerItem
     *
     * @apiParam {Number} Cid Unique ID of container
     *
     * @apiSuccess {ContainerItem[]} - List of container items, "-" is only a placeholder
     * @apiSuccess {Number} -.id Unique id for selected item 
     * @apiSuccess {String} -.name Name of the item
     * @apiSuccess {String} -.date_entered Date of entry
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *          {
     *              "id": 11,
     *              "name": "Item Name",
     *              "date_entered": "2019-08-26T04:00:00.000Z"
     *          },...
     *     ]
     *
     * @apiError BadRequest Parameters are not valid
     * @apiError NotFound Container not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       Message: "Container not found"
     *     }
     */
    async getContainerItems(req, res) {

        if (Object.keys(req.params).length != 1 || !req.params.Cid) {
            res.status(400).json({Message: "Parameters Do not match get request"})
            return
        }

        let containerItemParams = new ContainerItemResourceParameters(req.params)
        
        if (!containerItemParams.containerIdIsValid()) {
            res.status(400).json({Message: "Container Id is not valid or is not included"})
            return
        }

        try {
            const [err, result] = await Container.getContainerById(containerItemParams.containerId)
            if (err !== 200) {
                res.status(err).json(result)
                return
            }
        }
        catch(err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in ContainerItemsController"})
        }
        
        try {
            const [err, result] = await ContainerItem.getContainerItems(containerItemParams)
            if(!err){
                let itemsToReturn = []
                result.forEach((resource) => {
                    itemsToReturn.push(Mapper.containerItemToDto(resource))
                })
                console.log(itemsToReturn)
                res.status(200).json(itemsToReturn)
            }
            else {
                res.status(err).json(result)
            }
        }
        catch (err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in ContainerItemsController"})
        }
    },

    /**
     * @api {post} containers/:Cid/items Add new item to container
     * @apiName PostContainerItem
     * @apiGroup ContainerItem
     *
     * @apiParam {Number} Cid Unique ID of container
     * @apiParam {String} name Name of new item 
     * 
     * @apiSuccess {String} Message A simple confirmation message
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "Message": "Success"
     *     }
     *
     * @apiError BadRequest Body Invalid
     * @apiError NotFound Container Not Found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       Message: "Request body is invalid. Please provide item name"
     *     }
     */
    async create(req, res) {

        if (Object.keys(req.params).length != 1 || !req.params.Cid) {
            res.status(400).json({Message: "Parameters Do not match get request"})
            return
        }

        let containerItemParams = new ContainerItemResourceParameters(req.params)

        if (!containerItemParams.containerIdIsValid()) {
            res.status(400).json({Message: "Container Id is not valid or is not included"})
            return
        }
        
        if (Object.keys(req.body).length != 1 || !req.body.hasOwnProperty('name')){
            res.status(400).json({Message: "request body is invalid. Please provide item name"})
            return
        }

        try {
            const [err, result] = await Container.getContainerById(containerItemParams.containerId)
            if (err !== 200) {
                res.status(err).json(result)
                return
            }
        }
        catch(err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in ContainerItemsController"})
        }

        let date = new Date()
        let name = req.body.name

        let itemToCreate = new ItemForCreationDto(name, date, containerItemParams)
        try {
            const [status, result] = await ContainerItem.createContainerItem(itemToCreate)

            if(status === 201){
                res.status(201).json(result)
            }
            else {
                res.status(err).json(result)
            }
        }
        catch (err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in ContainerItemsController"})
        }
    },
    
    /**
     * @api {get} containers/:Cid/items/:Iid Request specific item from container
     * @apiName GetContainerItem
     * @apiGroup ContainerItem
     *
     * @apiParam {Number} Cid Unique ID of container
     * @apiParam {Number} Iid Unique ID of item
     *
     * @apiSuccess {Number} id Unique id for selected item
     * @apiSuccess {String} name Name of the item
     * @apiSuccess {String} date_entered  Date of entry
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 11,
     *       "name": "Item name",
     *       "date_entered": "2019-08-26T04:00:00.000Z"
     *     }
     *
     * @apiError BadRequest parameters are not valid or not included
     * @apiError NotFound Container not found or Item with Iid not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       Message: "Container Not Found"
     *     }
     */
    async getContainerItem(req, res) {

        if (Object.keys(req.params).length != 2 || !req.params.Cid || !req.params.Iid) {
            res.status(400).json({Message: "Bad request: Parameters Do not match get request"})
        }

        let containerItemParams = new ContainerItemResourceParameters(req.params)

        if (!containerItemParams.containerIdIsValid() || !containerItemParams.itemIdIsValid()) {
            res.status(400).json({Message: "Bad request: Container or item Id is not valid or is not included"})
        } 

        try {
            const [err, result] = await Container.getContainerById(containerItemParams.containerId)
            if (err !== 200) {
                res.status(err).json(result)
                return
            }
        }
        catch(err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in ContainerItemsController"})
        }

        try {
            const [status, result] = await ContainerItem.getContainerItem(containerItemParams)
            if(status === 200){
                let itemToReturn = Mapper.containerItemToDto(result)
                res.status(status).json(itemToReturn)
            }
            else {
                res.status(status).json(result)
            }
        }
        catch (err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in ContainerItemsController"})
        }
    }
}
export default ContainerItemsController