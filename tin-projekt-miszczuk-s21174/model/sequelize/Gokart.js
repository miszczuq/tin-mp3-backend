const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Gokart = sequelize.define('Gokart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            }
        }
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            }
        }
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            }
        }
    },
    horse_power: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole musi być liczbą całkowitą"
            },
            min:{
                args: [0],
                msg: "wartość musi być dodatnia"
            }
        }
    },
    weight: {
        type: Sequelize.DECIMAL(10,3),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isDecimal: {
                msg: "Pole musi być liczbą"
            },
            min:{
                args: [0],
                msg: "Wartość musi być dodatnia"
            }
        }
    },
    fuel_consumption: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            isDecimal: {
                msg: "Pole musi być liczbą"
            },
            min:{
                args: [0],
                msg: "Wartość musi być dodatnia"
            }
        }
    }
});

module.exports = Gokart;