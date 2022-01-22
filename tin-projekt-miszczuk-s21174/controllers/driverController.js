const DriverRepository = require('../repository/sequelize/DriverRepository');

exports.showDriverList = (req, res, next) => {
    DriverRepository.getDrivers()
        .then(drivers => {
            res.render('pages/driver/list', {
                drivers: drivers,
                navLocation: 'driver'
            });
        });
}

exports.showDriverForm = (req, res, next) => {
    res.render('pages/driver/form', {
        driver: {},
        pageTitle: 'Nowy kierowca',
        formMode: 'createNew',
        buttonLabel: 'Dodaj kierowcę',
        formAction: '/drivers/add',
        navLocation: 'driver',
        validationErrors: []
    });
}

exports.showDriverDetails = (req, res, next) => {
    const driverId = req.params.driverId;

    DriverRepository.getDriverById(driverId)
        .then(driver => {
            res.render('pages/driver/form', {
                driver: driver,
                pageTitle: 'Szczegóły kierowcy',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'driver',
                validationErrors: []
            });
        });
}

exports.showDriverEdit = (req, res, next) => {
    const driverId = req.params.driverId;

    DriverRepository.getDriverById(driverId)
        .then(driver => {
            res.render('pages/driver/form', {
                driver: driver,
                pageTitle: 'Edytuj kierowcę',
                formMode: 'edit',
                buttonLabel: 'Edytuj kierowcę',
                formAction: '/drivers/edit',
                navLocation: 'driver',
                validationErrors: []
            });
        });
}

exports.addDriver = (req, res, next) => {
    const driverData = {...req.body};
    DriverRepository.createDriver(driverData)
        .then(() => {
            res.redirect('/drivers');
        })
        .catch(err => {
            res.render('pages/driver/form', {
                driver: driverData,
                pageTitle: 'Nowy kierowca',
                formMode: 'createNew',
                buttonLabel: 'Dodaj kierowcę',
                formAction: '/drivers/add',
                navLocation: 'driver',
                validationErrors: err.errors
            });
        });
}

exports.updateDriver = (req, res, next) => {
    const driverId = req.body.id;
    const driverData = {...req.body};
    DriverRepository.updateDriver(driverId, driverData)
        .then(() => {
            res.redirect('/drivers');
        }).catch(err => {
        res.render('pages/driver/form', {
            driver: driverData,
            pageTitle: 'Edytuj kierowcę',
            formMode: 'edit',
            buttonLabel: 'Edytuj kierowcę',
            formAction: '/drivers/edit',
            navLocation: 'driver',
            validationErrors: err.errors
        })
    });
}

exports.deleteDriver = (req, res, next) => {
    const driverId = req.params.driverId;
    DriverRepository.deleteDriver(driverId)
        .then(() => {
            res.redirect('/drivers');
        })
}