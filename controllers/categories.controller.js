import Category from '../database/models/category'

const CategoriesController = {
    async getAll(req, res) {
      const [err, result] = await Category.findAll()
      if(!err)
        res.json(result)
      else 
        res.status(err).json()
    },
}

export default CategoriesController

