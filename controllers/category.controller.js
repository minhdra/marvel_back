const Category = require('../models/category.model');

class CategoryController {
  getAll(req, res) {
    Category.find({ active: true })
      .then((categories) => {
        return res.json(categories);
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  }

  getById(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Category.findOne(myQuery)
      .then((category) => res.json(category))
      .catch((err) => res.status(400).json('Error: ' + err));
  }

  // Create
  create(req, res) {
    Category.find()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        if (data) {
          const newId = data[0].id + 1;
          const category = new Category({
            id: newId,
            name: req.body.name,
          });

          category.save((err, category) => {
            if (err) {
              console.log(err);
              return err;
            } else {
              return res
                .status(200)
                .json('Create successful with category: ' + category.name);
            }
          });
        }
      });
  }

  // Update
  update(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Category.findOne(myQuery)
      .then((category) => {
        if (category) {
          category.name = req.body.name;
          category.save((err) => {
            if (err) return res.status(400).json('Error saving category');
            else return res.status(200).json('Successfully updated category');
          });
        } else return res.status(404).json('Category not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }

  // Delete
  delete(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Category.findOne(myQuery)
      .then((category) => {
        if (category) {
          category.active = false;
          category.save((err) => {
            if (err) return res.status(400).json('Error deleting category');
            else return res.status(200).json('Successfully deleted category');
          });
        } else return res.status(404).json('Category not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }
}

module.exports = new CategoryController();
