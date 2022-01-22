const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const driverApiRouter = require('./routes/api/driverApiRoute');
const gokartApiRouter = require('./routes/api/gokartApiRoute');
const driverGokartApiRouter = require('./routes/api/driverGokartApiRoute');
const userApiRouter = require('./routes/api/userApiRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());

const session = require('express-session');
app.use(session({
    secret: '06C1146B459F3F7C27935B0D0E1E656D52B5F1F4F4A42FC9ADAB7D8402E65A0A',
    resave: false
}))

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit().catch(err => {
    console.log(err);
});

app.use('/api/drivers', driverApiRouter);
app.use('/api/gokarts', gokartApiRouter);
app.use('/api/driverGokarts', driverGokartApiRouter);
app.use('/api/users', userApiRouter);

module.exports = app;
