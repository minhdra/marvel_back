const Character = require('../models/character.model');

class CharacterController {
  // Search
  search(req, res) {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 10;
    let sortName = req.body.sortName;
    let sortHero = req.body.sortHero;
    let sort = {};
    const myQuery = {
      id: { $exists: true },
      hero: { $regex: `.*${req.body.hero}.*`, $options: 'i' },
      name: { $regex: `.*${req.body.name}.*`, $options: 'i' },
      active: true,
    };
    let aggregateQuery = [
      { $match: myQuery },
      {
        $graphLookup: {
          from: 'movies', // Match with to collection what want to search
          startWith: '$movies', // Name of array (origin)
          connectFromField: 'movies', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'movies', // Add or replace field in origin collection
        },
      },
      {
        $graphLookup: {
          from: 'stories', // Match with to collection what want to search
          startWith: '$story_moments', // Name of array (origin)
          connectFromField: 'story_moments', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'story_moments', // Add or replace field in origin collection
        },
      },
    ];
    if (sortName || sortHero) {
      if (sortName) sort.name = sortName;
      if (sortHero) sort.hero = sortHero;
      aggregateQuery.push({ $sort: sort });
    }
    Character.aggregate(aggregateQuery)
      .skip(page * pageSize - pageSize)
      .limit(pageSize)
      .then((characters) => {
        return res.json(characters);
      });
  }

  // Get by id
  getById(req, res) {
    const myQuery = { id: Number(req.params.id), active: true };
    let aggregateQuery = [
      { $match: myQuery },
      {
        $graphLookup: {
          from: 'movies', // Match with to collection what want to search
          startWith: '$movies', // Name of array (origin)
          connectFromField: 'movies', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'movies', // Add or replace field in origin collection
        },
      },
    ];
    Character.aggregate(aggregateQuery)
      .then((characters) => {
        return res.json(characters[0]);
      })
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Create
  create(req, res) {
    let character;
    Character.find()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        const newId = data.length > 0 ? data[0].id + 1 : 1;
        character = new Character({
          id: newId,
          name: req.body.name,
          hero: req.body.hero,
          overview: req.body.overview,
          card_thumb: req.body.card_thumb,
          portrait_url: req.body.portrait_url,
          background_url: req.body.background_url,
          story_moments: req.body.story_moments,
          abilities: req.body.abilities,
          movies: req.body.movies,
          bio: req.body.bio,
          masthead: req.body.masthead,
        });
        character.save((err, character) => {
          if (err) {
            return res.status(400).json('Cannot save!');
          } else {
            return res
              .status(200)
              .json('Created successful with character: ' + character.name);
          }
        });
      });
  }

  // Update
  update(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Character.findOne(myQuery)
      .then((character) => {
        if (character) {
          const hero = character.hero;
          character.name = req.body.name;
          character.hero = req.body.hero;
          character.overview = req.body.overview;
          character.card_thumb = req.body.card_thumb;
          character.portrait_url = req.body.portrait_url;
          character.background_url = req.body.background_url;
          character.story_moments = req.body.story_moments;
          character.abilities = req.body.abilities;
          character.movies = req.body.movies;
          character.bio = req.body.bio;
          character.masthead = req.body.masthead;
          character.save((err) => {
            if (err) return res.status(400).json('Error saving character');
            else
              return res
                .status(200)
                .json(
                  `Successfully updated character from ${hero} to ${character.hero}`
                );
          });
        } else return res.status(404).json('Character not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }

  // Delete
  delete(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Character.findOne(myQuery)
      .then((character) => {
        if (character) {
          character.active = false;
          character.save((err) => {
            if (err) return res.status(400).json('Error deleting character');
            else
              return res
                .status(200)
                .json(`Successfully deleted character: ${character.name}`);
          });
        } else return res.status(404).json('Character not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }
}

module.exports = new CharacterController();
