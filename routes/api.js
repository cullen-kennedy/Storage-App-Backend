import express from 'express'
const router = express.Router();

//import * as authJwt from '../middleware/verifyJWT'

//import * as UserController from '../controllers/user.controller'
import ContainersController from '../controllers/containers.controller'
import CategoriesController from '../controllers/categories.controller'
import ItemsController from '../controllers/items.controller'


router.get('/', function(req, res, next) {
    res.json({status:"success", message:"House Storage API", data:{"version_number":"v1.0.0"}})
});

/**
 * Bare minimum of get methods here
 * for front end prototype.
 * Will most likely be adding more
 */

//Get all items indifferent to category or container
//More useful for quick lookup with name query parameter
router.get('/items', ItemsController.getAll)

//Get containers by category
//Better for browsing - eg look up my movie
router.get('/categories', CategoriesController.getAll)
router.get('/categories/:id/containers', ContainersController.getCategoryContainers)

//Get items by container
//Better for managing the storage
router.get('/containers', ContainersController.getAll)
router.get('/containers/:id/items', ItemsController.getContainerItems)



//Then more post, delete, update etc....

export default router