const express = require('express');
const router = express.Router();

const gokartApiController = require('../../api/GokartAPI');

router.get('/', gokartApiController.getGokarts);
router.get('/:gokartId', gokartApiController.getGokartById);
router.post('/', gokartApiController.createGokart);
router.put('/:gokartId', gokartApiController.updateGokart);
router.delete('/:gokartId', gokartApiController.deleteGokart);

module.exports = router;