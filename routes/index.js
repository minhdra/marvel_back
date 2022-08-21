const moviesRoute = require('./movies');
const categoriesRoute = require('./categories');

function directionRoute(app) {
  app.use('/movies', moviesRoute);
  app.use('/categories', categoriesRoute);
}

module.exports = directionRoute;
