const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 10],
                msg: "Pole powinno zawierać od 5 do 10 znaków"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg : "Pole jest wymagane"}
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"},
            len: {
                args: [2, 10],
                msg: "Pole powinno zawierać od 2 do 10 znaków"
            }
        }
    }
});

module.exports = User;