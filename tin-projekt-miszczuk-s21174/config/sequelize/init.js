const sequelize = require('./sequelize');

const Driver = require('../../model/sequelize/Driver');
const Gokart = require('../../model/sequelize/Gokart');
const DriverGokart = require('../../model/sequelize/DriverGokart');

module.exports= () => {
    Driver.hasMany(DriverGokart, {as: 'laps', foreignKey: {name: 'driver_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    DriverGokart.belongsTo(Driver, {as: 'driver', foreignKey: {name: 'driver_id', allowNull: false}});
    Gokart.hasMany(DriverGokart, {as: 'laps', foreignKey: {name: 'gokart_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    DriverGokart.belongsTo(Gokart, {as: 'gokart', foreignKey: {name: 'gokart_id', allowNull: false}});

    let allDrivers, allGokarts;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Driver.findAll();
        })
        .then(drivers => {
            if( !drivers || drivers.length === 0 ){
                return Driver.bulkCreate([
                    {first_name: 'Michal',second_name: 'Janek', last_name: 'Miszczuk', birthdate: '2020-10-11', weight: 12.2, phone_number: '123 321 1323'},
                    {first_name: 'Micdadsahal',second_name: 'Janek', last_name: 'asdasd', birthdate: '2020-10-11', weight: 1122.2, phone_number: '123 3211 123'},
                ])
                    .then( () => {
                        return Driver.findAll();
                    });
            }else{
                return drivers;
            }
        })
        .then( drivers => {
            allDrivers = drivers;
            return Gokart.findAll();
        })
        .then( gokarts => {
            if( !gokarts || gokarts.length === 0 ){
                return Gokart.bulkCreate([
                    {brand: 'Audi', model: 'modelasd', color: 'czarny', horse_power: 123, weight: 12.2, fuel_consumption: 123},
                    {brand: 'Aucccdi', model: 'modedaddlasd', color: 'czarnadasy', horse_power: 1233, weight: 12.122, fuel_consumption: null},
                    {brand: 'Aaaaadi', model: 'modelasd', color: 'czarny', horse_power: 123, weight: 12.2, fuel_consumption: 123}
                ])
                    .then( () => {
                        return Driver.findAll();
                    });
            }else{
                return gokarts;
            }
        })
        .then( gokarts => {
            allGokarts = gokarts;
            return DriverGokart.findAll();
        })
        .then(driverGokarts => {
            if( !driverGokarts || driverGokarts.length === 0 ){
                return DriverGokart.bulkCreate([
                    {driver_id: allDrivers[1].id, gokart_id: allGokarts[0].id, lap_time: 125.321, wet_track: true},
                    {driver_id: allDrivers[1].id, gokart_id: allGokarts[1].id, lap_time: 132.321, wet_track: false},
                    {driver_id: allDrivers[0].id, gokart_id: allGokarts[1].id, lap_time: 123.321, wet_track: false},
                ]);
            }else{
                return driverGokarts;
            }
        });
};