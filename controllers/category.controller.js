const Category = require('../models/category.model');

class CategoryController {
  // Search
  search(req, res) {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 10;
    let sort = req.body.sort;
    const myQuery = {
      id: { $exists: true },
      name: { $regex: `.*${req.body.name}.*`, $options: 'i' },
      active: true,
    };
    Category.find(myQuery)
      .sort(sort ? { name: sort } : '')
      .skip(page * pageSize - pageSize)
      .limit(pageSize)
      .then((category) => res.json(category))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Get by id
  getById(req, res) {
    const myQuery = { id: req.params.id, active: true };
    Category.findOne(myQuery)
      .then((category) => res.json(category))
      .catch((err) => res.status(400).json('Error: ' + err.message));
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
