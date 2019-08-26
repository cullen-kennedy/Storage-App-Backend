import Category from '../database/models/category.model'
const CategoriesController = {

    /**
     * @api {get} categories Request categories
     * @apiName GetCategories
     * @apiGroup Category
     *
     * @apiSuccess {Number} id Unique id of desired category.
     * @apiSuccess {String} name Name of the category.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *       "id": 1,
     *       "name": "Movies"
     *     }]
     */
    async getAllCategories(req, res) {
        try {
            const [status, result] = await Category.getCategories()
            //Just return a name for filtering for now
            if(status === 200){
                res.status(200).json(result)
            }
            else {
                res.status(status).json(result)
            }
        }
        catch (err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in CategoriesController"})
        }
    }
}

export default CategoriesController;