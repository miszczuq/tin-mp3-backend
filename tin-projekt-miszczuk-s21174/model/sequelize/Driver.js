const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Driver = sequelize.define('Driver', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            }
        }
    },
    // second_name: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     validate:{
    //         notEmpty:{
    //             msg: "Pole jest wymagane"
    //         },
    //         len: {
    //             args: [2,20],
    //             msg: "Pole powinno zawierać od 2 do 20 znaków"
    //         }
    //     }
    // },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            }
        }
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
            , isBefore:
                {
                    args: new Date().toISOString().slice(0, 10).replace(/-/g, "-"),
                    msg: "Data urodzenia nie może być z przyszłości"
                }
        }
    },
    weight: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDecimal: {
                msg: "Pole musi być liczbą"
            },
            min: {
                args: [0],
                msg: "Wartość musi być dodatnia"
            }
        }
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    }
});

module.exports = Driver;