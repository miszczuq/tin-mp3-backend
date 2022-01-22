const GokartRepository = require('../repository/sequelize/GokartRepository');

exports.getGokarts = (req, res, next) => {
    GokartRepository.getGokarts()
        .then(gokarts => {
            res.status(200).json(gokarts);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getGokartById = (req, res, next) => {
    const gokartId = req.params.gokartId;
    GokartRepository.getGokartById(gokartId)
        .then(gokart => {
            if (!gokart) {
                res.status(404).json({
                    message: 'Gokart with id: ' + gokartId + ' not found'
                })
            } else {
                res.status(200).json(gokart);
            }
        });
};

exports.createGokart = (req, res, next) => {
    GokartRepository.createGokart(req.body)
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

exports.updateGokart = (req, res, next) => {
    const gokartId = req.params.gokartId;
    GokartRepository.updateGokart(gokartId, req.body)
        .then(result => {
            res.status(200).json({message: 'Gokart updated!', gokart: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};

exports.deleteGokart = (req, res, next) => {
    const gokartId = req.params.gokartId;
    GokartRepository.deleteGokart(gokartId)
        .then(result => {
            res.status(200).json({message: 'Gokart removed!', gokart: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
};