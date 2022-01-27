const jwt = require('jsonwebtoken');
const config = require ('../config/auth/key');
const authUtil = require('../util/authUtils');

module.exports = (req, res, next) => {
    console.log("isAdmin req user role", req.user.role)
    if(req.user.role !== 'Admin'){
        return res.sendStatus(403)
    }
    next();
}