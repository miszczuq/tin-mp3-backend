const Driver = require('../../model/sequelize/Driver');
const Gokart = require('../../model/sequelize/Gokart');
const DriverGokart = require('../../model/sequelize/DriverGokart');

exports.getGokarts = () => {
    return Gokart.findAll();
};

exports.getGokartById = (gokartId) => {
    return Gokart.findByPk(gokartId,
        {
            include: [{
                model: DriverGokart,
                as: 'laps',
                include: [{
                    model: Driver,
                    as: 'driver'
                }]
            }]
        });
};

exports.createGokart = (gokartData) => {
    return Gokart.create({
        brand: gokartData.brand,
        model: gokartData.model,
        color: gokartData.color,
        horse_power: gokartData.horse_power,
        weight: gokartData.weight,
        fuel_consumption: gokartData.fuel_consumption
    });
};

exports.updateGokart = (gokartId, gokartData) => {
    return Gokart.update(gokartData, {where: {id: gokartId}});
};

exports.deleteGokart = (gokartId) => {
    return Gokart.destroy({
        where: {id: gokartId}
    });
};
