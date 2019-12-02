import Sequelize from 'sequelize';
const config = require('./libs/boot.js');
let sequelize = null;

module.exports = app => {
  if (!sequelize) {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: 'sqlite'
      }
    )
  }
  return sequelize;
};
