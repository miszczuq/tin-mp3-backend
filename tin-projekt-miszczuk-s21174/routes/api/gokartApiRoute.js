const express = require('express');
const router = express.Router();

const gokartApiController = require('../../api/GokartAPI');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', isAuth, isAdmin, gokartApiController.getGokarts);
router.get('/:gokartId',isAuth, isAdmin, gokartApiController.getGokartById);
router.post('/',isAuth, isAdmin, gokartApiController.createGokart);
router.put('/:gokartId',isAuth, isAdmin, gokartApiController.updateGokart);
router.delete('/:gokartId',isAuth,  isAdmin, gokartApiController.deleteGokart);

module.exports = router;