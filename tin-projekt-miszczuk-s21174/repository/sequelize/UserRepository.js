const User = require('../../model/sequelize/User');

exports.getUsers = () => {
    return User.findAll();
};

exports.getUserById = (userId) => {
    return User.findByPk(userId);
};

exports.createUser = (userData) => {
    return User.create({
        username: userData.username,
        password: userData.password,
        role : userData.role
    });
};

exports.deleteUser = (userId) => {
    return User.destroy({
        where: {id: userId}
    });
};

exports.getUserByUsername = (username) => {
    return User.findOne({
        where: {username: username}
    });
}
