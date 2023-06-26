const Sequelize = require('sequelize');

const sequelize = new Sequelize('interactly', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;