import { Mapper } from '../helpers/mappingProfile';
import ContainerItem from '../database/models/containerItem.model'
import ItemForCreationDto from '../dtos/itemforcreationDto'
import ContainerItemResourceParameters from '../helpers/containerItemResourceParameters'

const ContainerItemsController = {

    /**
     * @api {get} containers/:Cid/items Request items from a container
     * @apiName GetContainerItems
     * @apiGroup ContainerItem
     *
     * @apiParam {Number} Cid Unique id of the container.
     *
     * @apiSuccess {Number} id Unique id of the item.
     * @apiSuccess {String} name name of the item.
     * @apiSuccess {String} date_entered Date that the item was entered into the system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *       "id": 11,
     *       "name": "Item name",
     *       "date_entered": "2019-08-26T04:00:00.000Z"
     *     }]
     *
     * @apiError BadRequest Container Id parameter is not valid.
     * @apiError NotFound No items found for this container.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       Message: "No Items Found for this container"
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
            const [err, result] = await ContainerItem.getContainerItems(containerItemParams)
            if(!err){
                let itemsToReturn = []
                result.forEach((resource) => {
                    itemsToReturn.push(Mapper.containerItemToDto(resource))
                })
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
     * @api {post} containers/:Cid/items Add an item into a container
     * @apiName PostContainerItem
     * @apiGroup ContainerItem
     *
     * @apiParam {Number} Cid Containers unique ID.
     * @apiParam {String} name Name of new item. 
     * 
     * @apiSuccess {String} Message A confirmation message
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "Message": "Success"
     *     }
     *
     * @apiError BadRequest Body Invalid
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       Message: "request body is invalid. Please provide item name"
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
     * @api {get} /containers/:Cid/items/:Iid Request specific item from a container
     * @apiName GetContainerItem
     * @apiGroup ContainerItem
     *
     * @apiParam {Number} Cid Containers unique ID.
     * @apiParam {Number} Iid Items unique ID.
     *
     * @apiSuccess {Number} id Unique id of the item.
     * @apiSuccess {String} name  Name of the item.
     * @apiSuccess {String} date_entered  Date that the item was entered into the system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 11,
     *       "name": "Item name",
     *       "date_entered": "2019-08-26T04:00:00.000Z"
     *     }
     *
     * @apiError BadRequest parameters are not valid or not included.
     * @apiError NotFound No item found in this container.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       Message: "No Items Found for this container"
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