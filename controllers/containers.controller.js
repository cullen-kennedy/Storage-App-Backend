
import Container from '../database/models/container.model'
import { Mapper } from '../helpers/mappingProfile';
import { getContainerItems, createContainerItem } from '../database/sqlStore';
import ContainerResourceParameters from '../helpers/containerResourceParameters';
import ContainerForCreationDto from '../dtos/containerforcreationDto'


const ContainersController = {

  /**
   * @api {get} containers/:id Request specific container
   * @apiName GetContainer
   * @apiGroup Container
   *
   * @apiParam {Number} id Unique ID of container
   *
   * @apiSuccess {Number} id Unique id of selected container
   * @apiSuccess {String} name Name of the container
   * @apiSuccess {String} link  Self referential link
   * @apiSuccess {String} dateEntered Date of entry
   * @apiSuccess {Object} rel Simple nested relation
   * @apiSuccess {String} rel.categoryName Name of related category
   * @apiSuccess {String} rel.locationName Name of related location
   * 
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 11,
   *       "name": "Item name",
   *       "link": "api/containers/2",
   *       "dateEntered": "2019-08-26T04:00:00.000Z",
   *       "rel": {
   *          "categoryName": "Movies",
   *          "locationName": "Attic"
   *       }
   *     }
   *
   * @apiError BadRequest Parameters are not valid or included
   * @apiError NotFound No container found
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       Message: "Bad request"
   *     }
   */
  async getContainerById(req, res) {

    //Check param id
    if (isNaN(parseInt(req.params.id, 10))) {
      res.status(400).json({Message: "Bad request"})
      return
    }
    try {
      const [status, result] = await Container.getContainerById(req.params.id)
      if (status === 200) {
        res.status(status).json(Mapper.containerToDto(result))
      }
      else {
        res.status(status).json(result)
      }
    }
    catch (err) {
      console.error(err.message)
      res.status(500).json({Message: "Exception in ContainersController"}) //replace for production?
    }
  },
  
  /**
   * @api {get} containers Request all containers
   * @apiName GetContainers
   * @apiGroup Container
   *
   * @apiSuccess {Object[]} payload List of requested containers
   * @apiSuccess {Number} payload.id Unique id of selected container
   * @apiSuccess {String} payload.name Name of the container
   * @apiSuccess {String} payload.link  Self referential link
   * @apiSuccess {String} payload.dateEntered  Date of entry
   * @apiSuccess {Object} payload.rel Simple nested relation
   * @apiSuccess {String} payload.rel.categoryName Name of related category
   * @apiSuccess {String} payload.rel.locationName Name of related location
   * 
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *    "payload": [
   *        {
   *          "id": 11,
   *          "name": "Item name",
   *          "link": "api/containers/2",
   *          "dateEntered": "2019-08-26T04:00:00.000Z",
   *          "rel": {
   *              "categoryName": "Movies",
   *              "locationName": "Attic"
   *          }
   *        },...
   *    ]
   *
   * @apiError BadRequest Parameters are not valid or included
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       Message: "Bad request"
   *     }
   */
  async getAllContainers(req, res) {

    const queryLength = Object.entries(req.query).length;

    if (queryLength > 2) {
      res.status(400).json({Message: "Bad request"})
      return
    }

    const queries = new ContainerResourceParameters(req.query)
    
    try {
      const [status, result] = await Container.getAllContainers(queries)
      if(status === 200){
        let containersToReturn = []
        result.forEach((resource) => {
          containersToReturn.push(Mapper.containerToDto(resource))
        })
        res.status(status).json({"payload": containersToReturn})
      }
      else {
        res.status(status).json(result)
      }
    }
    catch(err) {
      console.error(err.message)
      res.status(500).json({Message: "Exception in ContainersController"})
    }
  },

  /**
     * @api {post} containers Add new item to container
     * @apiName PostContainer
     * @apiGroup Container
     *
     * @apiParam {Number} Cid Unique ID of container
     * @apiParam {String} name Name of new item 
     * @apiParam {Number} categoryId Unique id of related category
     * @apiParam {String} locationId Unique id of related location
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
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       Message: "Request body is invalid"
     *     }
     */
  async createContainer(req, res) {
    if (Object.keys(req.body).length != 3 || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('categoryId') || !req.body.hasOwnProperty('locationId')){
      res.status(400).json({Message: "request body is invalid."})
      return
    }

    let date = new Date()
    let name = req.body.name
    let categoryId = req.body.categoryId
    let locationId = req.body.locationId

    let containerToCreate = new ContainerForCreationDto(name, date, categoryId, locationId)

    try {
      const [status, result] = await Container.createContainer(containerToCreate)

      if(status === 201){
          res.status(201).json(result)
      }
      else {
          res.status(err).json(result)
      }
  }
  catch (err) {
      console.error(err.message)
      res.status(500).json({Message: "Exception in ContainerController"})
  }
  }
}

export default ContainersController
