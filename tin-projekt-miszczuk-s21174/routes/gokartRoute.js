const express = require('express');
const router = express.Router();
const gokartController = require('../controllers/gokartController');

router.get('/', gokartController.showGokartList);
router.get('/add', gokartController.showGokartForm);
router.get('/details/:gokartId', gokartController.showGokartDetails);
router.get('/edit/:gokartId', gokartController.showGokartEdit);

router.post('/add', gokartController.addGokart);
router.post('/edit', gokartController.updateGokart);
router.get('/delete/:gokartId', gokartController.deleteGokart);

module.exports = router;