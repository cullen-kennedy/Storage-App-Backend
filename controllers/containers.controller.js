import Container from '../database/models/container'

const ContainersController = {
  async getAll(req, res) {
    const [err, result] = await Container.getAll()
    if(!err)
      res.json(result)
    else 
      res.status(err).json()
  },
  async getCategoryContainers(req, res) {
    const [err, result] = await Container.getCategoryContainers(req.params.id)
    if(!err)
      res.json(result)
    else 
      res.status(err).json()
  }
}

export default ContainersController