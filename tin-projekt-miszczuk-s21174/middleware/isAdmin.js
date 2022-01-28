const jwt = require('jsonwebtoken');
const config = require ('../config/auth/key');
const authUtil = require('../util/authUtils');

module.exports = (req, res, next) => {
    if(req.user && req.user.role !== 'Admin'){
        console.log("isAdmin req user role", req.user.role)
        return res.sendStatus(403)
    }
    next();
}