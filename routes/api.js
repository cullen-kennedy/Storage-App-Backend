import express from 'express'
const router = express.Router();

//import * as authJwt from '../middleware/verifyJWT'

//import * as UserController from '../controllers/user.controller'
import ContainersController from '../controllers/containers.controller'
import ContainerItemsController from '../controllers/containerItems.controller'
import ItemsController from '../controllers/items.controller'
import LocationsController from '../controllers/locations.controller'
import CategoriesController from '../controllers/categories.controller'
import UsersController from '../controllers/users.controller'

import authJwt from '../middleware/verifyJWT'


router.get('/', function(req, res, next) {
    res.json({status:"success", message:"House Storage API", data:{"version_number":"v1.0.0"}})
});

//ITEMS


router.get('/items', [authJwt.verifyToken], ItemsController.getAll)

//CONTAINERS
/**
 * To do: 
 *      1. containers endpoint with filter query for categories and location DONE
 *      2. creating a new container DONE
 *      Finish these endpoints then focus on front end app, then do users auth/registration, then update, edit, delete etc...
 */

router.post('/containers', [authJwt.verifyToken], ContainersController.createContainer)
router.get('/containers', [authJwt.verifyToken], ContainersController.getAllContainers)
router.get('/containers/:id', [authJwt.verifyToken], ContainersController.getContainerById)

//CONTAINER ITEMS

router.get('/containers/:Cid/items', [authJwt.verifyToken], ContainerItemsController.getContainerItems)
router.get('/containers/:Cid/items/:Iid', [authJwt.verifyToken], ContainerItemsController.getContainerItem)
router.post('/containers/:Cid/items', [authJwt.verifyToken], ContainerItemsController.create)


//CONTAINER ATTRIBUTES
/**
 * Shared common locations and categories among users.
 * Not the best, but it keeps it simple.
 * will hopefully add personal locations and categories later.
 */

router.get('/locations', LocationsController.getAllLocations)
router.get('/categories', CategoriesController.getAllCategories)

router.post('/users/signup', UsersController.signUp)
router.post('/users/signin', UsersController.login)

export default router