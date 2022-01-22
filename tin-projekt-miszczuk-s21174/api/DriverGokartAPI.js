const DriverGokartRepository = require('../repository/sequelize/DriverGokartRepository');

exports.getDriverGokarts = (req, res) => {
    DriverGokartRepository.getDriverGokarts()
        .then(driverGokarts => {
            res.status(200).json(driverGokarts);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.getDriverGokartById = (req, res) => {
    const driverGokartId = req.params.driverGokartId;
    DriverGokartRepository.getDriverGokartById(driverGokartId)
        .then(driverGokart => {
            if (!driverGokart) {
                res.status(404);
            } else {
                res.status(200).json(driverGokart);
            }
        });
};

exports.createDriverGokart = (req, res, next) => {
    DriverGokartRepository.createDriverGokart(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.updateDriverGokart = (req, res) => {
    const driverGokartId = req.params.driverGokartId;
    DriverGokartRepository.updateDriverGokart(driverGokartId, req.body)
        .then(result => {
            res.status(200).json({
                driverGokart: result
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.deleteDriverGokart = (req, res) => {
    const driverGokartId = req.params.driverGokartId;
    DriverGokartRepository.deleteDriverGokart(driverGokartId)
        .then(result => {
            res.status(200).json({
                driverGokart: result
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};