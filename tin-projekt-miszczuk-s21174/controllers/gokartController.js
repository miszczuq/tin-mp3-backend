const GokartRepository = require('../repository/sequelize/GokartRepository');

exports.showGokartList = (req, res, next) => {
    GokartRepository.getGokarts()
        .then(gokarts => {
            res.render('pages/gokart/list', {
                gokarts: gokarts,
                navLocation: 'gokart'
            })
        });
}

exports.showGokartForm = (req, res, next) => {
    res.render('pages/gokart/form', {
        gokart: {},
        pageTitle: 'Nowy gokart',
        formMode: 'createNew',
        buttonLabel: 'Dodaj gokart',
        formAction: '/gokarts/add',
        navLocation: 'gokart',
        validationErrors: []
    });
}

exports.showGokartDetails = (req, res, next) => {
    const gokartId = req.params.gokartId;

    GokartRepository.getGokartById(gokartId)
        .then(gokart => {
            res.render('pages/gokart/form', {
                gokart: gokart,
                pageTitle: 'Szczegóły gokarta',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'gokart',
                validationErrors: []
            });
        });
}

exports.showGokartEdit = (req, res, next) => {
    const gokartId = req.params.gokartId;

    GokartRepository.getGokartById(gokartId)
        .then(gokart => {
            res.render('pages/gokart/form', {
                gokart: gokart,
                pageTitle: 'Edytuj gokart',
                formMode: 'edit',
                buttonLabel: 'Edytuj gokart',
                formAction: '/gokarts/edit',
                navLocation: 'gokart',
                validationErrors: []
            });
        });
}

exports.addGokart = (req, res, next) => {
    const gokartData = {...req.body};
    GokartRepository.createGokart(gokartData)
        .then(() => {
            res.redirect('/gokarts');
        })
        .catch(err => {
            res.render('pages/gokart/form', {
                gokart: gokartData,
                pageTitle: 'Nowy gokart',
                formMode: 'createNew',
                buttonLabel: 'Dodaj gokart',
                formAction: '/gokarts/add',
                navLocation: 'gokart',
                validationErrors: err.errors
            });
        });
};

exports.updateGokart = (req, res, next) => {
    const gokartId = req.body.id;
    const gokartData = {...req.body};
    GokartRepository.updateGokart(gokartId, gokartData)
        .then(() => {
            res.redirect('/gokarts');
        }).catch(err => {
        res.render('pages/gokart/form', {
            gokart: gokartData,
            pageTitle: 'Edytuj gokart',
            formMode: 'edit',
            buttonLabel: 'Edytuj gokart',
            formAction: '/gokarts/edit',
            navLocation: 'gokart',
            validationErrors: err.errors
        });
    });
}

exports.deleteGokart = (req, res, next) => {
    const gokartId = req.params.gokartId;
    GokartRepository.deleteGokart(gokartId)
        .then(() => {
            res.redirect('/gokarts');
        })
}