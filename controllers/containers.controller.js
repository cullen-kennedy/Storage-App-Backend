
import Container from '../database/models/container.model'
import { Mapper } from '../helpers/mappingProfile';
import { getContainerItems } from '../database/sqlStore';


const ContainersController = {

  /**
   * @api {get} containers/:id Find a container by its id
   * @apiName GetContainer
   * @apiGroup Container
   *
   * @apiParam {Number} id containers unique ID.
   *
   * @apiSuccess {Number} id Unique id of container.
   * @apiSuccess {String} name Name of the container.
   * @apiSuccess {String} link  Link to itself.
   * @apiSuccess {String} date_entered  date that the container was entered into the system.
   * @apiSuccess {Object} rel Names of category and location. 
   * 
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 11,
   *       "name": "Item name",
   *       "link": "api/containers/2",
   *       "date_entered": "2019-08-26T04:00:00.000Z",
   *       "rel": {
   *          "category_name": "Movies",
   *          "location_name": "Attic"
   *       }
   *     }
   *
   * @apiError BadRequest Container Id is not valid or is not included
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
  
  async getContainers(req, res) {
    //req.query.location
    //req.query.category
  }
}

export default ContainersController
