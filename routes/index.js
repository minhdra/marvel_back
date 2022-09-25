const dashboard = require('./dashboard');
const moviesRoute = require('./movies');
const categoriesRoute = require('./categories');

function directionRoute(app) {
  app.use('/', dashboard);
  app.use('/movies', moviesRoute);
  app.use('/categories', categoriesRoute);
}

module.exports = directionRoute;
