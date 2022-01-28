const sequelize = require('./sequelize');
const authUtil = require('../../util/authUtils');

const Driver = require('../../model/sequelize/Driver');
const Gokart = require('../../model/sequelize/Gokart');
const DriverGokart = require('../../model/sequelize/DriverGokart');
const User = require('../../model/sequelize/User');

module.exports = () => {
    Driver.hasMany(DriverGokart, {
        as: 'laps',
        foreignKey: {name: 'driver_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    DriverGokart.belongsTo(Driver, {
        as: 'driver',
        foreignKey: {name: 'driver_id', allowNull: false}
    });
    Gokart.hasMany(DriverGokart, {
        as: 'laps',
        foreignKey: {name: 'gokart_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    DriverGokart.belongsTo(Gokart, {
        as: 'gokart',
        foreignKey: {name: 'gokart_id', allowNull: false}
    });
    User.hasMany(Driver,{
        as: 'driver',
        foreignKey: {name: 'manager_id', allowNull: false},
        constraint: true,
        onDelete: 'CASCADE'
    });
    Driver.belongsTo(User, {
        as: 'manager',
        foreignKey: {name: 'manager_id', allowNull: false}
    })

    let allDrivers, allGokarts,allUsers;
    return sequelize
        .sync({force: true})
        .then(() => {
            return User.bulkCreate([
                {
                    username: 'admin',
                    password: authUtil.hashPassword('admin'),
                    role: 'Admin'
                },
                {
                    username: 'user',
                    password: authUtil.hashPassword('user123'),
                    role: 'User'
                },
                {
                    username: 'szczepan',
                    password: authUtil.hashPassword('szczepan123'),
                    role: 'User'
                },
                {
                    username: 'mistrz',
                    password: authUtil.hashPassword('mistrz123'),
                    role: 'User'
                },
            ]).then(() => {
                return User.findAll();
            });
        })
        .then(users => {
            allUsers = users;
            return Driver.findAll();
        })
        .then(drivers => {
            if (!drivers || drivers.length === 0) {
                return Driver.bulkCreate([
                    {
                        first_name: 'Michal',
                        last_name: 'Miszczuk',
                        birthdate: '2020-10-11',
                        weight: 100.2,
                        phone_number: '123 321 1323',
                        manager_id: allUsers[0].id
                    },
                    {
                        first_name: 'Michal',
                        last_name: 'Ruszczar',
                        birthdate: '2020-10-11',
                        weight: 72.2,
                        phone_number: '123 888 123',
                        manager_id: allUsers[0].id
                    },
                    {
                        first_name: 'Grzegorz',
                        last_name: 'Celowski',
                        birthdate: '2020-10-11',
                        weight: 82.2,
                        phone_number: '123 587 123',
                        manager_id: allUsers[1].id
                    },
                    {
                        first_name: 'Zbigniew',
                        last_name: 'Barowski',
                        birthdate: '2020-10-11',
                        weight: 92.2,
                        phone_number: '123 876 123',
                        manager_id: allUsers[1].id
                    },
                    {
                        first_name: 'Franek',
                        last_name: 'Jankowski',
                        birthdate: '2020-10-14',
                        weight: 112.2,
                        phone_number: '123 211 999',
                        manager_id: allUsers[2].id
                    },
                ]).then(() => {
                    return Driver.findAll();
                });
            } else {
                return drivers;
            }
        })
        .then(drivers => {
            allDrivers = drivers;
            return Gokart.findAll();
        })
        .then(gokarts => {
            if (!gokarts || gokarts.length === 0) {
                return Gokart.bulkCreate([
                    {
                        brand: 'Audi',
                        model: 'A3',
                        color: 'czarny',
                        horse_power: 123,
                        weight: 12.2,
                        fuel_consumption: 123
                    },
                    {
                        brand: 'Mercedes',
                        model: 'E500',
                        color: 'biały',
                        horse_power: 1233,
                        weight: 12.122,
                        fuel_consumption: null
                    },
                    {
                        brand: 'Daewoo',
                        model: 'Lanos',
                        color: 'zielony',
                        horse_power: 123,
                        weight: 12.2,
                        fuel_consumption: 123
                    }
                ]).then(() => {
                    return Driver.findAll();
                });
            } else {
                return gokarts;
            }
        })
        .then(gokarts => {
            allGokarts = gokarts;
            return DriverGokart.findAll();
        })
        .then(driverGokarts => {
            if (!driverGokarts || driverGokarts.length === 0) {
                return DriverGokart.bulkCreate([
                    {driver_id: allDrivers[1].id, gokart_id: allGokarts[0].id, lap_time: 142.321, wet_track: true},
                    {driver_id: allDrivers[1].id, gokart_id: allGokarts[1].id, lap_time: 152.121, wet_track: false},
                    {driver_id: allDrivers[2].id, gokart_id: allGokarts[2].id, lap_time: 323.411, wet_track: false},
                    {driver_id: allDrivers[0].id, gokart_id: allGokarts[0].id, lap_time: 113.531, wet_track: false},
                    {driver_id: allDrivers[1].id, gokart_id: allGokarts[0].id, lap_time: 99.311, wet_track: false},
                ]);
            } else {
                return driverGokarts;
            }
        });
};