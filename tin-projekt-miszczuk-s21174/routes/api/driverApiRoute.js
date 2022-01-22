const express = require('express');
const router = express.Router();

const driverApiController = require('../../api/DriverAPI');

router.get('/', driverApiController.getDrivers);
router.get('/:driverId', driverApiController.getDriverById);
router.post('/', driverApiController.createDriver);
router.put('/:driverId', driverApiController.updateDriver);
router.delete('/:driverId', driverApiController.deleteDriver);

module.exports = router;