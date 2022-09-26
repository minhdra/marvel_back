const Movie = require('../models/movie.model');

class MovieController {
  /** getAll(req, res) {
    Movie.aggregate([
      {
        $graphLookup: {
          from: 'categories', // Match with to collection what want to search
          startWith: '$categories', // Name of array (origin)
          connectFromField: 'categories', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'categories', // Add or replace field in origin collection
        },
      },
      {
        $graphLookup: {
          from: 'companies', // Match with to collection what want to search
          startWith: '$companies', // Name of array (origin)
          connectFromField: 'companies', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'companies', // Add or replace field in origin collection
        },
      },
    ]).then((movies) => {
      return res.json(movies.filter((movie) => movie.active === true));
    });
  } */

  // Search
  search(req, res) {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 10;
    let sort = req.body.sort;
    const myQuery = {
      id: { $exists: true },
      title: { $regex: `.*${req.body.title}.*`, $options: 'i' },
      active: true,
    };
    Movie.aggregate([
      {
        $graphLookup: {
          from: 'categories', // Match with to collection what want to search
          startWith: '$categories', // Name of array (origin)
          connectFromField: 'categories', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'categories', // Add or replace field in origin collection
        },
      },
      {
        $graphLookup: {
          from: 'companies', // Match with to collection what want to search
          startWith: '$companies', // Name of array (origin)
          connectFromField: 'companies', // Field of array
          connectToField: 'id', // from which field it will match
          as: 'companies', // Add or replace field in origin collection
        },
      },
    ])
      .sort(sort ? { name: sort } : '')
      .skip(page * pageSize - pageSize)
      .limit(pageSize)
      .then((movies) => {
        return res.json(movies);
      });
  }

  // Get by id
  getById(req, res) {
    const myQuery = { id: req.params.id, active: true };
    Movie.findOne(myQuery)
      .then((movie) => res.json(movie))
      .catch((err) => res.status(400).json('Error: ' + err.message));
  }

  // Create
  create(req, res) {
    Movie.find()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        if (data) {
          const newId = data[0].id + 1;
          const movie = new Movie({
            id: newId,
            categories: req.body.categories,
            duration: req.body.duration,
            trailer: req.body.trailer,
            tagline: req.body.tagline,
            overview: req.body.overview,
            budget: req.body.budget,
            revenue: req.body.revenue,
            imdb_id: req.body.imdb_id,
            status: req.body.status,
            title: req.body.title,
            companies: req.body.companies,
            release_date: req.body.release_date,
            backdrop_path: req.body.backdrop_path,
            poster_path: req.body.poster_path,
          });

          movie.save((err, movie) => {
            if (err) {
              console.log(err);
              return err;
            } else {
              return res
                .status(200)
                .json('Create successful with movie: ' + movie.title);
            }
          });
        }
      });
  }

  // Update
  update(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Movie.findOne(myQuery)
      .then((movie) => {
        if (movie) {
          movie.categories = req.body.categories;
          movie.duration = req.body.duration;
          movie.trailer = req.body.trailer;
          movie.tagline = req.body.tagline;
          movie.overview = req.body.overview;
          movie.budget = req.body.budget;
          movie.revenue = req.body.revenue;
          movie.imdb_id = req.body.imdb_id;
          movie.status = req.body.status;
          movie.title = req.body.title;
          movie.companies = req.body.companies;
          movie.release_date = req.body.release_date;
          movie.backdrop_path = req.body.backdrop_path;
          movie.poster_path = req.body.poster_path;
          movie.save((err) => {
            if (err) return res.status(400).json('Error saving movie');
            else return res.status(200).json('Successfully updated movie');
          });
        } else return res.status(404).json('Movie not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }

  // Delete
  delete(req, res) {
    const myQuery = { id: req.body.id, active: true };
    Movie.findOne(myQuery)
      .then((movie) => {
        if (movie) {
          movie.active = false;
          movie.save((err) => {
            if (err) return res.status(400).json('Error deleting movie');
            else return res.status(200).json('Successfully deleted movie');
          });
        } else return res.status(404).json('Movie not found');
      })
      .catch((err) => res.status(404).json(`Error!!!`));
  }
}

module.exports = new MovieController();
