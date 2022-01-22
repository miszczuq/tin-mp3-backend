const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

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