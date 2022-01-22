
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const driverApiRouter = require('./routes/api/DriverApiRoute');
const gokartApiRouter = require('./routes/api/GokartApiRoute');
const driverGokartApiRouter = require('./routes/api/DriverGokartApiRoute');

var indexRouter = require('./routes/index');
var driverRouter = require('./routes/driverRoute')
var gokartRouter = require('./routes/gokartRoute')
var driverGokartRouter = require('./routes/driverGokartRoute')

var app = express();

app.use(cors());

// app.get('/', function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/drivers', driverRouter);
app.use('/gokarts', gokartRouter);
app.use('/driverGokarts', driverGokartRouter);

app.use('/api/drivers', driverApiRouter);
app.use('/api/gokarts', gokartApiRouter);
app.use('/api/driverGokarts', driverGokartApiRouter);


const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;
