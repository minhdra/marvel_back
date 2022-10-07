const Ability = require('../models/ability.model');

class AbilityController {
  // Search
  search(req, res) {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 10;
    let sort = req.body.sort;
    const myQuery = {
      id: { $exists: true },
      name: { $regex: `.*${req.body.name}.*`, $options: 'i' },
      description: { $regex: `.*${req.body.description}.*`, $options: 'i' },
      active: true,
    };
    Ability.find(myQuery)
      .sort(sort ? { name: sort } : '')
      .skip(page * pageSize - pageSize)
      .limit(pageSize)
      .then((ability) => res.json(ability))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Get by id
  getById(req, res) {
    const myQuery = { id: req.params.id, active: true };
    Ability.findOne(myQuery)
      .then((ability) => res.json(ability))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Create
  create(req, res) {
    let ability;
    Ability.find()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        const newId = data.length > 0 ? data[0].id + 1 : 1;
        ability = new Ability({
          id: newId,
          name: req.body.name,
          description: req.body.description,
          image_url: req.body.image_url,
        });
        ability.save((err, ability) => {
          if (err) {
            return res.status(400).json('Cannot save!');
          } else {
            return res
              .status(200)
              .json('Created successful with ability: ' + ability.name);
          }
        });
      });
  }

  // Update
  update(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Ability.findOne(myQuery)
      .then((ability) => {
        if (ability) {
          ability.name = req.body.name;
          ability.description = req.body.description;
          ability.image_url = req.body.image_url;
          ability.save((err) => {
            if (err) return res.status(400).json('Error saving ability');
            else
              return res
                .status(200)
                .json(
                  `Successfully updated ability`
                );
          });
        } else return res.status(404).json('Ability not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }

  // Delete
  delete(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Ability.findOne(myQuery)
      .then((ability) => {
        if (ability) {
          ability.active = false;
          ability.save((err) => {
            if (err) return res.status(400).json('Error deleting ability');
            else
              return res
                .status(200)
                .json(`Successfully deleted ability: ${ability.name}`);
          });
        } else return res.status(404).json('Ability not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }
}

module.exports = new AbilityController();
