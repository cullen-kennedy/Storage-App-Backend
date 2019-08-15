import Item from '../database/models/container'

const ItemsController = {
  async getAll(req, res) {

    const [err, result] = await Item.findAll()
      if(!err)
        res.json(result)
      else {
        console.error(err)
        res.status(err).json()
    }
  },
  async getById(req, res) {
    const [err, result] = await Item.findById(req.params.id)
    if(!err)
      res.json(result)
    else 
      res.status(err).json()
  }
}


export default ItemsController