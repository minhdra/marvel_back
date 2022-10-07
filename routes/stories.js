const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/story.controller');

router.post('/search', StoryController.search);
router.get('/:id', StoryController.getById);
router.post('/create', StoryController.create);
router.post('/update', StoryController.update);
router.post('/delete', StoryController.delete);

module.exports = router;
