const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

module.exports = router;
