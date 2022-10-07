const Story = require('../models/story.model');

class StoryController {
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
    Story.find(myQuery)
      .sort(sort ? { name: sort } : '')
      .skip(page * pageSize - pageSize)
      .limit(pageSize)
      .then((story) => res.json(story))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Get by id
  getById(req, res) {
    const myQuery = { id: req.params.id, active: true };
    Story.findOne(myQuery)
      .then((story) => res.json(story))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Create
  create(req, res) {
    let story;
    Story.find()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        const newId = data.length > 0 ? data[0].id + 1 : 1;
        story = new Story({
          id: newId,
          name: req.body.name,
          description: req.body.description,
          image_url: req.body.image_url,
        });
        story.save((err, story) => {
          if (err) {
            return res.status(400).json('Cannot save!');
          } else {
            return res
              .status(200)
              .json('Created successful with story: ' + story.name);
          }
        });
      });
  }

  // Update
  update(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Story.findOne(myQuery)
      .then((story) => {
        if (story) {
          story.name = req.body.name;
          story.description = req.body.description;
          story.image_url = req.body.image_url;
          story.save((err) => {
            if (err) return res.status(400).json('Error saving story');
            else
              return res
                .status(200)
                .json(
                  `Successfully updated story`
                );
          });
        } else return res.status(404).json('Story not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }

  // Delete
  delete(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Story.findOne(myQuery)
      .then((story) => {
        if (story) {
          story.active = false;
          story.save((err) => {
            if (err) return res.status(400).json('Error deleting story');
            else
              return res
                .status(200)
                .json(`Successfully deleted story: ${story.name}`);
          });
        } else return res.status(404).json('Story not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }
}

module.exports = new StoryController();
