const Driver = require('../../model/sequelize/Driver');
const Gokart = require('../../model/sequelize/Gokart');
const DriverGokart = require('../../model/sequelize/DriverGokart');

exports.getDrivers = () => {
    return Driver.findAll();
};

exports.getDriverById = (driverId) => {
    return Driver.findByPk(driverId,
        {
            include: [{
                model: DriverGokart,
                as: 'laps',
                include: [{
                    model: Gokart,
                    as: 'gokart'
                }]
            }]
        });
};

exports.createDriver = (driverData) => {
    return Driver.create({
        first_name: driverData.first_name,
        last_name: driverData.last_name,
        birthdate: driverData.birthdate,
        weight: driverData.weight,
        phone_number: driverData.phone_number
    });
};

exports.updateDriver = (driverId, driverData) => {
    const first_name = driverData.first_name;
    const last_name = driverData.last_name;
    const birthdate = driverData.birthdate;
    const weight = driverData.weight;
    const phone_number = driverData.phone_number;

    return Driver.update(driverData, {where: {id: driverId}});
};

exports.deleteDriver = (driverId) => {
    return Driver.destroy({
        where: {id: driverId}
    });
};
