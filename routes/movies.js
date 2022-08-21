const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie.controller');

router.get('/', MovieController.getAll);

module.exports = router;
