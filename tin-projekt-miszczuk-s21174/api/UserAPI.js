const userRepository = require('../repository/sequelize/UserRepository');


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
        password: req.body.password
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
    userRepository.deleteUser(req.params.userId)
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