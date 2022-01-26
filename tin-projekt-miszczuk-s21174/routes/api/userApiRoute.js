const express = require('express');
const router = express.Router();
const authUtil = require('../../util/authUtils');
const Role = require('../../util/role')

const userApiController = require('../../api/UserAPI');

// logować się i wylogowywać może każdy - czyli rola użytkownika niezalogowanego
router.post('/login', userApiController.login);
router.get('/roleCheck', userApiController.getUserRoles);
router.post('/register', userApiController.createUser);
router.get('/logout', userApiController.logout);

// wszystkich użytkowników oraz wybranych użytkowników po ID może pobierać zwykły zalogowany użytkownik
router.get('/', authUtil.permitAuthenticatedUserWithRole([Role.Admin]), userApiController.getUsers);
router.get('/:userId', authUtil.permitAuthenticatedUserWithRole([Role.Admin, Role.User]), userApiController.getUserById);

// dodawać i usuwać użytkowników może zalogowany użytkownik z rolą ADMIN
router.post('/', authUtil.permitAuthenticatedUserWithRole([Role.Admin]), userApiController.createUser);
router.delete('/:userId', authUtil.permitAuthenticatedUserWithRole([Role.Admin]), userApiController.deleteUser);

module.exports = router;