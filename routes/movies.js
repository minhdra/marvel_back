const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie.controller');

router.post('/search', MovieController.search);
router.get('/:id', MovieController.getById);
router.post('/create', MovieController.create);
router.post('/update', MovieController.update);
router.post('/delete', MovieController.delete);

module.exports = router;
