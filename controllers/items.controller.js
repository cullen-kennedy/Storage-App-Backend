import Item from '../database/models/item.model'
import ItemResourceParameters from '../helpers/itemResourceParameters'
import { Mapper } from '../helpers/mappingProfile';

const ItemsController = {

/**
   * @api {get} items Request items
   * @apiName GetItems
   * @apiGroup Item
   *
   * @apiParam {String} search Search string for a substring contained in item name.
   *
   * @apiSuccess {Object[]} payload List of desired items
   * @apiSuccess {Number} payload.id Unique id of selected item
   * @apiSuccess {String} payload.name Item name
   * @apiSuccess {String} payload.dateEntered Date of entry
   * @apiSuccess {Object} payload.rel Simple nested container relationship
   * @apiSuccess {String} payload.rel.name Name of related container
   * @apiSuccess {String} payload.rel.link Link to related container
   * 
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "payload": [
   *            {
   *                "id": 1,
   *                "name": "V",
   *                "link": "api/items/1",
   *                "dateEntered": "2019-08-22T04:00:00.000Z",
   *                "rel": {
   *                    "name": "Box3",
   *                    "link": "api/containers/3"
   *                 }
   *           },...
   *        ]
   *     }
   *
   * @apiError BadRequest Search parameters are invalid
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       Message: "Bad request"
   *     }
   */
  async getAll(req, res) {


      //If no search, return everything. Also if not supported queries, return bad request
      if (req.query.search === undefined) {
        var params = null
        if (Object.entries(req.query).length > 0) {
          res.status(400).json({Message: "Bad request"})
          return
        }
      }
      //else input search, blank search will be replaced with null
      else {
        var params = new ItemResourceParameters(req.query.search)
      }
      try {
        const [status, result] = await Item.findAll(params, req.UserId)
        if(status === 200){
          let itemsToReturn = []
          result.forEach((resource) => {
            itemsToReturn.push(Mapper.itemToDto(resource))
          })
          res.status(status).json({"payload": itemsToReturn})
        }
        else {
          res.status(status).json(result)
        }
      }
      catch(err) {
        console.error(err.message)
        res.status(500).json({Message: "Exception in ItemsController"})
      }
  }

}

export default ItemsController