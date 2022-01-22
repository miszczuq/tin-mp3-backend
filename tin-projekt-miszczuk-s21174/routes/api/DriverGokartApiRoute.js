const express = require('express');
const router = express.Router();

const driverGokartApiController = require('../../api/DriverGokartAPI');

router.get('/', driverGokartApiController.getDriverGokarts);
router.get('/:driverGokartId', driverGokartApiController.getDriverGokartById);
router.post('/', driverGokartApiController.createDriverGokart);
router.put('/:driverGokartId', driverGokartApiController.updateDriverGokart);
router.delete('/:driverGokartId', driverGokartApiController.deleteDriverGokart);

module.exports = router;