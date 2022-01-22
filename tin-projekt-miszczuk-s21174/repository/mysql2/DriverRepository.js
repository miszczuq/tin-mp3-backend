const db = require('./../config/mysql2/db');

exports.getDriver= () => {
    return db.promise().query('SELECT * FROM Driver')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        });
};

exports.getDriverById= (driverId) => {
    const query = `SELECT d.id, d.first_name, d.last_name, d.birthdate, d.weight, d.phone_number, 
    g.id, g.brand, g.model, g.color, g.horse_power, g.weight, g.fuel_consumption, dg.id, dg.driver_id, dg.gokart_id, dg.lap_time
    FROM Driver d
    LEFT JOIN Driver_Gokart dg on d.id = dg.driver_id
    LEFT JOIN Gokart g on g.id = dg.gokart_id
    WHERE e.id = ?`

    return db.promise().query(query, [driverId])
        .then( (results, fields) =>{
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const driver = {
                id: parseInt(driverId),
                first_name: firstRow.first_name,
                last_name: firstRow.last_name,
                birthdate: firstRow.birthdate,
                weight: firstRow.weight,
                phone_number: firstRow.phone_number,
                laps: []
            }
            for( let i=0; i<results[0].length; i++){
                const row = results[0][i];
                if(row.id){
                    const driverGokart = {
                        id: row.id,
                        lap_time: row.lap_time,
                        wet_track: row.wet_track,
                        driver: {
                            id: row.id,
                            first_name: row.first_name
                        },
                        gokart: {
                            id: row.id,
                            brand: row.brand,
                            model: row.model,
                        }
                    };
                    driver.laps.push(driverGokart);
                }
            }
            return driver;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createDriver= (driverData) => {

};

exports.updateDriver= (driverId, driverData) => {

};

exports.deleteDriver= (driverId) => {

};