const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(8);
const UserRepository = require('../repository/sequelize/UserRepository');
const config = require('../config/auth/key');

exports.hashPassword = (plainText => {
    return bcrypt.hashSync(plainText, salt);
});

exports.comparePasswords = ((plainText, passwordHash) => {
    return bcrypt.compareSync(plainText, passwordHash);
});

exports.permitAuthenticatedUserWithRole = (roles) => {
    const getUsername = loggerUser => {
        return loggerUser ? loggerUser.username : undefined;
    }
    return (req, res, next) => {
        const loggedUser = req.session.loggedUser;
        if (loggedUser && (roles && roles.includes(loggedUser.role))) {
            console.log('Authenticated user \'%s\' with roles %s', getUsername(loggedUser), roles);
            next();
        } else {
            console.log('Failed to user \'%s\' with roles %s', getUsername(loggedUser), roles);
            res.status(403).json();
        }
    }
}

exports.isAdmin = (req) => {
    return req.user.role === 'Admin'
}
//
// exports.getLoggedUserRole = (req) => {
//     let userId = this.getLoggedUserId(req)
//
//     let user
//         UserRepository.getSyncUserById(userId)
//         .then(response => {user = response;})
//             .catch( user = 'siema')
//     return user.role;
// }

exports.getLoggedUserId = (req) => {
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1],
            decoded;
        decoded = jwt.verify(authorization, config.secret);
        return decoded.userId;
    }
    return undefined;
}