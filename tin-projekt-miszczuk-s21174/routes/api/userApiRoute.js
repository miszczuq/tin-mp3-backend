const express = require('express');
const router = express.Router();

const userApiController = require('../../api/UserAPI');

router.get('/', userApiController.getUsers);
router.get('/:userId', userApiController.getUserById);
router.post('/', userApiController.createUser);
router.delete('/:userId', userApiController.deleteUser);

module.exports = router;