const express = require('express');
const router = express.Router();

const driverGokartApiController = require('../../api/DriverGokartAPI');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', driverGokartApiController.getDriverGokarts);
router.get('/:driverGokartId', isAuth, driverGokartApiController.getDriverGokartById);
router.post('/',isAuth, isAdmin, driverGokartApiController.createDriverGokart);
router.put('/:driverGokartId',isAuth, isAdmin, driverGokartApiController.updateDriverGokart);
router.delete('/:driverGokartId',isAuth, isAdmin, driverGokartApiController.deleteDriverGokart);

module.exports = router;