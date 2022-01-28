const userRepository = require('../repository/sequelize/UserRepository');
const authUtil = require('../util/authUtils');
const config = require('../config/auth/key');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require("../util/role");

exports.getUsers = (req, res) => {
    userRepository.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json();
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
        username: req.body.username,
        password: authUtil.hashPassword(req.body.password),
        role: Role.User,
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
            if (!user) {
                return res.status(401).send({message: "wrong_creds"})
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({message: "wrong_creds"})
                    }
                    const token = jwt.sign({
                            username: user.username,
                            userId: user.id,
                            role: user.role
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user.id, role: user.role})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json();
                })
        });
}

exports.logout = (req, res) => {
    req.session.loggedUser = undefined;
    res.status(200).json();
}