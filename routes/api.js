import express from 'express'
const router = express.Router();

//import * as authJwt from '../middleware/verifyJWT'

//import * as UserController from '../controllers/user.controller'
import ContainersController from '../controllers/containers.controller'
import ContainerItemsController from '../controllers/containerItems.controller'
import ItemsController from '../controllers/items.controller'
import LocationsController from '../controllers/locations.controller'
import CategoriesController from '../controllers/categories.controller'


router.get('/', function(req, res, next) {
    res.json({status:"success", message:"House Storage API", data:{"version_number":"v1.0.0"}})
});

//ITEMS


router.get('/items', ItemsController.getAll)

//CONTAINERS
/**
 * To do: 
 *      1. containers endpoint with filter query for categories and location DONE
 *      2. creating a new container DONE
 *      Finish these endpoints then focus on front end app, then do users auth/registration, then update, edit, delete etc...
 */

router.post('/containers', ContainersController.createContainer)
router.get('/containers', ContainersController.getAllContainers)
router.get('/containers/:id', ContainersController.getContainerById)

//CONTAINER ITEMS

router.get('/containers/:Cid/items', ContainerItemsController.getContainerItems)
router.get('/containers/:Cid/items/:Iid', ContainerItemsController.getContainerItem)
router.post('/containers/:Cid/items', ContainerItemsController.create)


//CONTAINER ATTRIBUTES
/**
 * Shared common locations and categories among users.
 * Not the best, but it keeps it simple.
 * will hopefully add personal locations and categories later.
 */

router.get('/locations', LocationsController.getAllLocations)
router.get('/categories', CategoriesController.getAllCategories)

export default router