const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.post('/search', CategoryController.search);
router.get('/:id', CategoryController.getById);
router.post('/create', CategoryController.create);
router.post('/update', CategoryController.update);
router.post('/delete', CategoryController.delete);

module.exports = router;
