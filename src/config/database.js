// config/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('forum', 'root', '', {
  host: 'localhost',
  port: '3333',
  dialect: 'mysql',
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
