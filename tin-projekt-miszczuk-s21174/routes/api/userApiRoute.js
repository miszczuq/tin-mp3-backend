const express = require('express');
const router = express.Router();
const authUtil = require('../../util/authUtils');

const userApiController = require('../../api/UserAPI');

router.get('/', authUtil.permitAuthenticatedUser, userApiController.getUsers);
router.get('/:userId', authUtil.permitAuthenticatedUser, userApiController.getUserById);
router.post('/', authUtil.permitAuthenticatedUser, userApiController.createUser);
router.delete('/:userId', authUtil.permitAuthenticatedUser, userApiController.deleteUser);
router.post('/login', userApiController.login);
router.post('/logout', userApiController.logout);

module.exports = router;