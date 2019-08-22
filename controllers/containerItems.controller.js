import { Mapper } from '../helpers/mappingProfile';
import ContainerItem from '../database/models/containerItem.model'

const ContainerItemsController = {

    /**
   * Finds items by container id
   * returns 200 for result
   * returns 400 if bad id argument
   * returns 404 for no items found
   * returns 500 if thrown error
   */
    async getContainerItems(req, res) {
        //Check id
        if (isNaN(parseInt(req.params.id, 10))) {
            res.status(400).json("Bad request")
            return
        } 
        const [err, result] = await ContainerItem.getContainerItems(req.params.id)
        if(!err){
        let itemsToReturn = []
        result.forEach((resource) => {
            itemsToReturn.push(Mapper.containerItemToDto(resource))
        })
        res.status(200).json({"payload": itemsToReturn})
        }
        else {
        res.status(err).json(result)
        }
    } 
}
export default ContainerItemsController