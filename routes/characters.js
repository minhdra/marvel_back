const express = require('express');
const router = express.Router();
const CharacterController = require('../controllers/character.controller');

router.post('/search', CharacterController.search);
router.get('/:id', CharacterController.getById);
router.post('/create', CharacterController.create);
router.post('/update', CharacterController.update);
router.post('/delete', CharacterController.delete);

module.exports = router;
