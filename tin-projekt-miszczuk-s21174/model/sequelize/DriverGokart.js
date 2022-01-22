const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const DriverGokart = sequelize.define('DriverGokart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    lap_time: {
        type: Sequelize.DECIMAL(7,3),
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
    wet_track: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate:{
            notNull:{
                msg: "Pole jest wymagane"
            }
        }
    },
    driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            }
        }
    },
    gokart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = DriverGokart;