import Item from '../database/models/item.model'
import ItemResourceParameters from '../helpers/itemResourceParameters'
import { Mapper } from '../helpers/mappingProfile';

const ItemsController = {

  /**
   * Accepts ?search="" as req.query.search
   * returns 200 for result
   * returns 404 for no items found
   * returns 500 if thrown error
   */
  async getAll(req, res) {

      //If no search return everything. Also if not supported queries specified return bad request
      if (req.query.search === undefined) {
        var params = null
        if (Object.entries(req.query).length > 0) {
          res.status(400).json("Bad request")
          return
        }
      }
      //else input search, blank search will be replaced with null
      else {
        var params = new ItemResourceParameters(req.query.search)
      }

    const [err, result] = await Item.findAll(params)
      if(!err){
        let itemsToReturn = []
        result.forEach((resource) => {
          itemsToReturn.push(Mapper.itemToDto(resource))
        })
        res.status(200).json({"payload": itemsToReturn})
      }
      else {
        res.status(err).json(result)
      }
  }
  
}

export default ItemsController