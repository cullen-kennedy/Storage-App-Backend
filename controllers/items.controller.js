import Item from '../database/models/item'

const ItemsController = {
  async getAll(req, res) {

    if (req.query.name) {
      var queryString = req.query.name
    }else {
      var queryString = null
    }

    const [err, result] = await Item.findAll(queryString)
      if(!err)
        res.json(result)
      else {
        console.error(err)
        res.status(err).json()
    }
  },
  
  async getContainerItems(req, res) {
    const [err, result] = await Item.getContainerItems(req.params.id)
    if(!err)
      res.json(result)
    else 
      res.status(err).json()
  }
}


export default ItemsController