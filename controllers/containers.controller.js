import Container from '../database/models/container'

const ContainersController = {
  async getAll(req, res) {

    const [err, result] = await Container.findAll()
      if(!err)
        res.json(result)
      else {
        res.status(err).json()
    }
    
  },
  async getById(req, res) {
    const [err, result] = await Container.findById(req.params.id)
    if(!err)
      res.json(result)
    else 
      res.status(err).json()
  },
  async getContainerItems(req, res) {
    const [err, result] = await Container.getContainerItems(req.params.id)
    if(!err)
      res.json(result)
    else 
      res.status(err).json()
  }
}

export default ContainersController