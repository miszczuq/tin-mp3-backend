const express = require('express');
const router = express.Router();
const authUtil = require('../../util/authUtils');
const Role = require('../../util/role')

const userApiController = require('../../api/UserAPI');
const isAuth = require('../../middleware/isAuth');
const isAdmin = require('../../middleware/isAdmin');

// logować się i wylogowywać może każdy - czyli rola użytkownika niezalogowanego
router.post('/login', userApiController.login);
router.get('/roleCheck',isAuth, userApiController.getUserRoles);
router.post('/register', userApiController.createUser);
router.get('/logout', userApiController.logout);

// wszystkich użytkowników oraz wybranych użytkowników po ID może pobierać zwykły zalogowany użytkownik
router.get('/',isAuth, isAdmin, userApiController.getUsers);
router.get('/:userId',isAuth, isAdmin, userApiController.getUserById);

// dodawać i usuwać użytkowników może zalogowany użytkownik z rolą ADMIN
router.post('/',isAuth, isAdmin, userApiController.createUser);
router.delete('/:userId',isAuth, isAdmin, userApiController.deleteUser);

module.exports = router;