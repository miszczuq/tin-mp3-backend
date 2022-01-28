const express = require('express');
const router = express.Router();

const userApiController = require('../../api/UserAPI');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');

router.post('/login', userApiController.login);
router.post('/register', userApiController.createUser);
router.get('/logout', userApiController.logout);

router.get('/', isAuth, isAdmin, userApiController.getUsers);
router.get('/:userId', isAuth, isAdmin, userApiController.getUserById);

router.post('/', isAuth, isAdmin, userApiController.createUser);
router.delete('/:userId', isAuth, isAdmin, userApiController.deleteUser);

module.exports = router;