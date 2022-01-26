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
    console.log("Headers", req.headers)
    const managerId = getLoggedUserId(req);
    console.log("Id wyszukane po TOKENIE", managerId)
    console.log("IsAdmin value", isAdmin(req))
    isAdmin(req)
        .then((resp) => {
            if(resp) {
                DriverRepository.getDrivers()
                    .then(drivers => {
                        console.log("Kierowcy dla admina", drivers)
                        res.status(200).json(drivers);
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            }else{
                DriverRepository.getUserDrivers(managerId)
                        .then(drivers => {
                            console.log("Kierowcy dla Zwyklaka", drivers)
                            res.status(200).json(drivers);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
            }
        })

    // if(isAdmin(req)) {
    //     DriverRepository.getDrivers()
    //         .then(drivers => {
    //             console.log("Kierowcy dla admina", drivers)
    //             res.status(200).json(drivers);
    //         })
    //         .catch((err) => {
    //             res.status(500).json(err);
    //         });
    // }else{
    //     DriverRepository.getUserDrivers(managerId)
    //         .then(drivers => {
    //             console.log("Kierowcy dla Zwyklaka", drivers)
    //             res.status(200).json(drivers);
    //         })
    //         .catch((err) => {
    //             res.status(500).json(err);
    //         });
    // }
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
    DriverRepository.deleteDriver(driverId)
        .then(result => {
            res.status(200).json({
                driver: result
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};