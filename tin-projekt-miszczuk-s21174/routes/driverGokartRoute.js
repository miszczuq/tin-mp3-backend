const express = require('express');
const router = express.Router();
const driverGokartController = require('../controllers/driverGokartController');

router.get('/', driverGokartController.showDriverGokartList);
router.get('/add', driverGokartController.showDriverGokartForm);
router.get('/details/:driverGokartId', driverGokartController.showDriverGokartDetails);
router.get('/edit/:driverGokartId', driverGokartController.showDriverGokartEdit);

router.post('/add', driverGokartController.addDriverGokart);
router.post('/edit', driverGokartController.updateDriverGokart);
router.get('/delete/:driverGokartId', driverGokartController.deleteDriverGokart);

module.exports = router;