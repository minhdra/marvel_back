const Movie = require('../models/movie.model');
const Category = require('../models/category.model');

class MovieController {
  getAll(req, res) {
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
      return res.json(movies);
    });
    // .find()
    // .then((movies) => {
    //   return res.json(movies);
    // })
    // .catch((err) => res.status(400).json('Error: ' + err));
  }
}

function getCategories(params, res) {
  const categories = [];
  params.forEach((id) => {
    const myQuery = { id };
    Category.findOne(myQuery)
      .then((category) => categories.push(category))
      .catch((err) => console.log(err));
  });
  return categories;
}

module.exports = new MovieController();
