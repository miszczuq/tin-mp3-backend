const Sequelize = require('sequelize');

const Driver = require('../../model/sequelize/Driver');
const Gokart = require('../../model/sequelize/Gokart');
const DriverGokart = require('../../model/sequelize/DriverGokart');

exports.getDriverGokarts = () => {
    return DriverGokart.findAll({
        include: [{
            model: Driver,
            as: 'driver'
        }, {
            model: Gokart,
            as: 'gokart'
        }]
    });
};

exports.getDriverGokartById = (driverGokartId) => {
    return DriverGokart.findByPk(driverGokartId,
        {
            include: [{
                model: Driver,
                as: 'driver'
            }, {
                model: Gokart,
                as: 'gokart'
            }]
        });
};

exports.createDriverGokart = (driverGokartData) => {
    return DriverGokart.create({
        lap_time: driverGokartData.lap_time,
        wet_track: driverGokartData.wet_track,
        driver_id: driverGokartData.driver_id,
        gokart_id: driverGokartData.gokart_id
    });
};

exports.updateDriverGokart = (driverGokartId, driverGokartData) => {
    return DriverGokart.update(driverGokartData, {where: {id: driverGokartId}});
};

exports.deleteDriverGokart = (driverGokartId) => {
    return DriverGokart.destroy({
        where: {id: driverGokartId}
    });
};