const DriverRepository = require('../repository/sequelize/DriverRepository');
const {isAdmin} = require("../util/authUtils");
const {getLoggedUserId} = require("../util/authUtils");

exports.getDrivers = (req, res) => {
    DriverRepository.getDrivers()
        .then(drivers => {
            res.status(200).json(drivers);
        })
        .catch((err) => {
            res.status(500).json(err);
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

exports.getDriversForRole = (req, res) => {
    //const managerId = getLoggedUserId(req);
    console.log("reqUserDriver GET", req.user.userId)
            if(isAdmin(req)) {
                console.log("isAdmin")
                DriverRepository.getDrivers()
                    .then(drivers => {
                        res.status(200).json(drivers);
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            }else{
                console.log("isNOTAdmin")
                DriverRepository.getUserDrivers(req.user.userId)
                        .then(drivers => {
                            res.status(200).json(drivers);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
            }
}

exports.createDriver = (req, res) => {
    DriverRepository.createDriver(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch((err) => {
            res.status(500).json(err);
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
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.deleteDriver = (req, res) => {
    const driverId = req.params.driverId;
    if(isAdmin(req)) {
        DriverRepository.deleteDriver(driverId)
            .then(result => {
                res.status(200).json({
                    driver: result
                });
            })
            .catch((err) => {
                res.status(401).json(err);
            });
    }else{
        DriverRepository.deleteUserDriver(driverId, req.user.userId)
            .then(result => {
                res.status(200).json({
                    driver: result
                });
            })
            .catch((err) => {
                console.log("user nie moze usunac swojego kierowcy")
                res.status(401).json(err);
            });
    }
};