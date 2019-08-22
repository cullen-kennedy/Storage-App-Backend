import express from 'express'
const router = express.Router();

//import * as authJwt from '../middleware/verifyJWT'

//import * as UserController from '../controllers/user.controller'
import ContainersController from '../controllers/containers.controller'
import ContainerItemsController from '../controllers/containerItems.controller'
import ItemsController from '../controllers/items.controller'


router.get('/', function(req, res, next) {
    res.json({status:"success", message:"House Storage API", data:{"version_number":"v1.0.0"}})
});


/**
 * optional query : ?search=""
 */
router.get('/items', ItemsController.getAll)

/**
 * Parameters : :id is container id
 * To add : '/containers' endpoint with filter query for categories and location as well
 */
router.get('/containers/:id', ContainersController.getContainerById)
router.get('/containers/:id/items', ContainerItemsController.getContainerItems)


export default router