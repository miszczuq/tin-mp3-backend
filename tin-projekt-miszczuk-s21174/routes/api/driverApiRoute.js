const express = require('express');
const router = express.Router();

const driverApiController = require('../../api/DriverAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', isAuth, driverApiController.getDriversForRole);
//router.get('/', driverApiController.getDriversByManagerId);
router.get('/:driverId', driverApiController.getDriverById);
router.post('/', isAuth, driverApiController.createDriver);
router.put('/:driverId', driverApiController.updateDriver);
router.delete('/:driverId', driverApiController.deleteDriver);

module.exports = router;