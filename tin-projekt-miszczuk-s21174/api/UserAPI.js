const userRepository = require('../repository/sequelize/UserRepository');
const authUtil = require('../util/authUtils');

exports.getUsers = (req, res) => {
    userRepository.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUserById = (req, res) => {
    userRepository.getUserById(req.params.userId)
        .then(user => {
            if (!user) {
                res.status(404);
            } else {
                res.status(200).json(user);
            }
        });
};

exports.createUser = (req, res, next) => {
    userRepository.createUser({
        login: req.body.password,
        password: authUtil.hashPassword(req.body.password),
        role: req.body.role
    }).then(newObj => {
        res.status(201).json(newObj);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteUser = (req, res) => {
    userRepository.deleteUser(req.body.login)
        .then(user => {
            res.status(200).json({
                user: user
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userRepository.getUserByUsername(username)
        .then(user => {
            if (!user || (password && !(authUtil.comparePasswords(password, user.password)))) {
                res.status(403).json();
            } else {
                req.session.loggedUser = user;
                res.status(200).json();
            }
        })
}

exports.logout = (req, res) => {
    req.session.loggedUser = undefined;
    res.status(200).json();
}