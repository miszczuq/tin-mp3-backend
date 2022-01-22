const DriverGokartRepository = require('../repository/sequelize/DriverGokartRepository');
const DriverRepository = require('../repository/sequelize/DriverRepository');
const GokartRepository = require('../repository/sequelize/GokartRepository');

exports.showDriverGokartList = (req, res, next) => {
    DriverGokartRepository.getDriverGokarts()
        .then(driverGokarts => {
            res.render('pages/driverGokart/list', {
                driverGokarts: driverGokarts,
                navLocation: 'driverGokart'
            });
        });
}

exports.showDriverGokartForm = (req, res, next) => {
    let allDrivers, allGokarts;
    let driverGokartData = { ...req.body};
    DriverRepository.getDrivers()
        .then( drivers => {
           allDrivers = drivers;
           return GokartRepository.getGokarts();
        })
        .then(gokarts => {
           allGokarts = gokarts;
            res.render('pages/driverGokart/form', {
                driverGokart: {},
                pageTitle: 'Nowy przejazd',
                formMode: 'createNew',
                buttonLabel: 'Dodaj przejazd',
                formAction: '/driverGokarts/add',
                navLocation: 'driverGokart',
                allGokarts: allGokarts,
                allDrivers: allDrivers,
                validationErrors: []
            });
        });
}

exports.showDriverGokartDetails = (req, res, next) => {
    const driverGokartId = req.params.driverGokartId;
    let allDrivers, allGokarts;

    DriverRepository.getDrivers()
        .then(drivers =>{
            allDrivers = drivers;
            return GokartRepository.getGokarts();
        })
        .then(gokarts => {
            allGokarts = gokarts;
            return DriverGokartRepository.getDriverGokartById(driverGokartId);
        })
        .then(driverGokart => {
            res.render('pages/driverGokart/form', {
                driverGokart: driverGokart,
                pageTitle: 'Szczegóły przejazu',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'driverGokart',
                allGokarts: allGokarts,
                allDrivers: allDrivers,
                validationErrors: []
            });
        });
}

exports.showDriverGokartEdit = (req, res, next) => {
    const driverGokartId = req.params.driverGokartId;
    let driverGokartTmp;
    let allDrivers, allGokarts;
    DriverGokartRepository.getDriverGokartById(driverGokartId)
        .then(driverGokart => {
            driverGokartTmp = driverGokart;
            return DriverRepository.getDrivers();
        })
        .then( drivers => {
            allDrivers = drivers;
            return GokartRepository.getGokarts();
        })
        .then(gokarts => {
            allGokarts = gokarts;
            res.render('pages/driverGokart/form', {
                driverGokart: driverGokartTmp,
                pageTitle: 'Edytuj przejazd',
                formMode: 'edit',
                buttonLabel: 'Edytuj przejazd',
                formAction: '/driverGokarts/edit',
                navLocation: 'driverGokart',
                allGokarts: allGokarts,
                allDrivers: allDrivers,
                validationErrors: []
            });
        });
}

exports.addDriverGokart = (req, res, next) => {
    const driverGokartId = req.body.id;
    const driverGokartData = { ...req.body };
    let allDrivers, allGokarts, editedDriver, driverGokart, error;

    DriverGokartRepository.createDriverGokart(driverGokartData)
        .then( () => {
            res.redirect('/driverGokarts');
        })
        .catch(err => {
            error = err;
            return DriverRepository.getDrivers();
        })
        .then( drivers => {
            allDrivers = drivers;
            return DriverGokartRepository.getDriverGokartById(driverGokartId);
        })
        .then( dg => {
            driverGokart = dg;
            return GokartRepository.getGokarts();
        })
        .then(gokarts => {
            allGokarts = gokarts;
            let tmp = driverGokartData.driver_id ? driverGokartData.driver_id : null;
            return DriverRepository.getDriverById(tmp)
        })
        .then(editedD => {
            editedDriver = editedD;
            let tmp = driverGokartData.gokart_id ? driverGokartData.gokart_id : null;
            return GokartRepository.getGokartById(tmp)
        })
        .then((e) => {
            let isTrackWet;
            if(driverGokartData.wet_track === 'true'){
                isTrackWet = true
            }else if(driverGokartData.wet_track === 'false'){
                isTrackWet = false
            }else{
                isTrackWet = null;
            }
            res.render('pages/driverGokart/form', {
                driverGokart: {
                    ...driverGokartData,
                    wet_track: isTrackWet,
                    driver: driverGokartData.driver,
                    gokart: driverGokartData.gokart
                },
                pageTitle: 'Nowy przejazd',
                formMode: 'createNew',
                buttonLabel: 'Dodaj przejazd',
                formAction: '/driverGokarts/add',
                navLocation: 'driverGokart',
                allGokarts: allGokarts,
                allDrivers: allDrivers,
                validationErrors: error ? error.errors : []
            });
        });
}

exports.updateDriverGokart = (req, res, next) => {
    const driverGokartId = req.body.id;
    const driverGokartData = { ...req.body };
    let allDrivers, allGokarts, editedDriver, driverGokart, error;

    DriverGokartRepository.updateDriverGokart(driverGokartId,driverGokartData)
        .then( () => {
            res.redirect('/driverGokarts');
        })
        .catch(err => {
            error = err;
            return DriverRepository.getDrivers();
        })
        .then( drivers => {
            allDrivers = drivers;
            return DriverGokartRepository.getDriverGokartById(driverGokartId);
        })
        .then( dg => {
            driverGokart = dg;
            return GokartRepository.getGokarts();
        })
        .then(gokarts => {
            allGokarts = gokarts;
            return DriverRepository.getDriverById(driverGokart.driver_id)
        })
        .then(editedD => {
            editedDriver = editedD;
            return GokartRepository.getGokartById(driverGokart.gokart_id)
        })
        .then(editedGokart => {
            res.render('pages/driverGokart/form', {
                driverGokart: {
                    ...driverGokartData,
                    wet_track: driverGokartData.wet_track === 'true',
                    driver: editedDriver,
                    gokart: editedGokart
                },
                pageTitle: 'Edytuj przejazd',
                formMode: 'edit',
                buttonLabel: 'Edytuj przejazd',
                formAction: '/driverGokarts/edit',
                navLocation: 'driverGokart',
                allGokarts: allGokarts,
                allDrivers: allDrivers,
                validationErrors: error ? error.errors : []
            });
        });
}

exports.deleteDriverGokart = (req, res, next) => {
    const driverGokartId = req.params.driverGokartId;
    DriverGokartRepository.deleteDriverGokart(driverGokartId)
        .then( () => {
            res.redirect('/driverGokarts');
        })
}