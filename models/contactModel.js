const Sequelize = require('sequelize');
const sequelize = require('../database/connect');

const contactModel = sequelize.define('contacts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: false
});

module.exports = contactModel;