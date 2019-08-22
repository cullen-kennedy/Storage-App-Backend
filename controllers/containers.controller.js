
import Container from '../database/models/container.model'
import { Mapper } from '../helpers/mappingProfile';


const ContainersController = {

  /**
   * Finds Container by id
   * returns 200 for result
   * returns 400 if bad id argument
   * returns 404 for no container found
   * returns 500 if thrown error
   */
  async getContainerById(req, res) {

    //Check param id
    if (isNaN(parseInt(req.params.id, 10))) {
      res.status(400).json("Bad request")
      return
    }

    const [err, result] = await Container.getContainerById(req.params.id)
    if (!err) {
      res.status(200).json(Mapper.containerToDto(result))
    }
    else {
      res.status(err).json(result)
    }
  }  
}

export default ContainersController
