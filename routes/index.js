const dashboard = require('./dashboard');
const moviesRoute = require('./movies');
const categoriesRoute = require('./categories');
const charactersRoute = require('./characters');
const storiesRoute = require('./stories');
const abilitiesRoute = require('./abilities');

function directionRoute(app) {
  app.use('/', dashboard);
  app.use('/movies', moviesRoute);
  app.use('/categories', categoriesRoute);
  app.use('/characters', charactersRoute);
  app.use('/stories', storiesRoute);
  app.use('/abilities', abilitiesRoute);
}

module.exports = directionRoute;
