const DriverRepository = require('../repository/sequelize/DriverRepository');

exports.getDrivers = (req, res) => {
    DriverRepository.getDrivers()
        .then(drivers => {
            res.status(200).json(drivers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDriverById = (req, res) => {
    const driverId = req.params.driverId;
    DriverRepository.getDriverById(driverId)
        .then(driver => {
            if (!driver) {
                res.status(404);
            } else {
                res.status(200).json(driver);
            }
        });
};

exports.createDriver = (req, res, next) => {
    DriverRepository.createDriver(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateDriver = (req, res) => {
    const driverId = req.params.driverId;
    DriverRepository.updateDriver(driverId, req.body)
        .then(result => {
            res.status(200).json({
                driver: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};

exports.deleteDriver = (req, res) => {
    const driverId = req.params.driverId;
    DriverRepository.deleteDriver(driverId)
        .then(result => {
            res.status(200).json({
                driver: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};