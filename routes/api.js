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
 * models/:id routes only tested in postman. 
 *  */
router.get('/items', ItemsController.getAll)
router.get('/items/:id', ItemsController.getById)

router.get('/categories', CategoriesController.getAll)
router.get('/categories/:id', CategoriesController.getById)

router.get('/containers', ContainersController.getAll)
router.get('/containers/:id', ContainersController.getById)
router.get('/containers/:id/items', ContainersController.getContainerItems)


//Then more post, delete, update etc....

export default router