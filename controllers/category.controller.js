const Category = require('../models/category.model');

class CategoryController {
  getAll(req, res) {
    Category.find()
      .then((categories) => {
        return res.json(categories);
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  }

  getById(req, res) {
    const myQuery = { id: req.params.id };
    Category.findOne(myQuery)
      .then((categories) => res.json(categories))
      .catch((err) => res.status(400).json('Error: ' + err));
  }
}

module.exports = new CategoryController();
