const express = require('express');
const router = express.Router();

const driverApiController = require('../../api/DriverAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', isAuth, driverApiController.getDriversForRole);
router.get('/:driverId',isAuth, driverApiController.getDriverById);
router.post('/', isAuth, driverApiController.createDriver);
router.put('/:driverId',isAuth, driverApiController.updateDriver);
router.delete('/:driverId',isAuth, driverApiController.deleteDriver);

module.exports = router;