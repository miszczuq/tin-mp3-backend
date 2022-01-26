const express = require('express');
const router = express.Router();

const gokartApiController = require('../../api/GokartAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', gokartApiController.getGokarts);
router.get('/:gokartId', gokartApiController.getGokartById);
router.post('/', gokartApiController.createGokart);
router.put('/:gokartId', gokartApiController.updateGokart);
router.delete('/:gokartId', isAuth, gokartApiController.deleteGokart);

module.exports = router;