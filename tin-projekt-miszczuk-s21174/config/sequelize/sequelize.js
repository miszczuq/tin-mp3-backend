const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-mp2-sequelize', 'root', 'root', {
   dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

