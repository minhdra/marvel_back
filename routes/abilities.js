const express = require('express');
const router = express.Router();
const AbilityController = require('../controllers/ability.controller');

router.post('/search', AbilityController.search);
router.get('/:id', AbilityController.getById);
router.post('/create', AbilityController.create);
router.post('/update', AbilityController.update);
router.post('/delete', AbilityController.delete);

module.exports = router;
