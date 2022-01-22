const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (plainText => {
    return bcrypt.hashSync(plainText, salt);
});

exports.comparePasswords = ((plainText, passwordHash) => {
    return bcrypt.compareSync(plainText, passwordHash);
});

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    } else {
        res.status(503).json();
    }
}