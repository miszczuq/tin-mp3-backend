const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(8);
const config = require('../config/auth/key');

exports.hashPassword = (plainText => {
    return bcrypt.hashSync(plainText, salt);
});

exports.comparePasswords = ((plainText, passwordHash) => {
    return bcrypt.compareSync(plainText, passwordHash);
});

exports.isAdmin = (req) => {
    return req.user.role === 'Admin'
}

exports.getLoggedUserId = (req) => {
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1],
            decoded;
        decoded = jwt.verify(authorization, config.secret);
        return decoded.userId;
    }
    return undefined;
}