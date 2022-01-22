const DriverGokartRepository = require('../repository/sequelize/DriverGokartRepository');

exports.getDriverGokarts = (req, res, next) => {
    DriverGokartRepository.getDriverGokarts()
        .then( driverGokarts => {
            res.status(200).json(driverGokarts);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDriverGokartById = (req, res, next) =>{
    const driverGokartId= req.params.driverGokartId;
    DriverGokartRepository.getDriverGokartById(driverGokartId)
        .then(driverGokart => {
            if(!driverGokart){
                res.status(404).json({
                    message: 'Lap with id: '+driverGokartId+' not found'
                })
            } else{
                res.status(200).json(driverGokart);
            }
        });
};

exports.createDriverGokart = (req,res,next) => {
    DriverGokartRepository.createDriverGokart(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateDriverGokart = (req,res,next) => {
    const driverGokartId= req.params.driverGokartId;
    DriverGokartRepository.updateDriverGokart(driverGokartId, req.body)
        .then(result => {
            res.status(200).json({message: 'Lap updated!', driverGokart: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
        });
};

exports.deleteDriverGokart = (req,res,next) => {
    const driverGokartId= req.params.driverGokartId;
    DriverGokartRepository.deleteDriverGokart(driverGokartId)
        .then(result => {
            res.status(200).json({message: 'Lap removed!', driverGokart: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
        });
};