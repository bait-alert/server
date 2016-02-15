'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Url', {
    value: { type: DataTypes.STRING, allowNull: false }
  }, {
    classMethods: {
      associate (models) {
        models.Report.hasMany(models.Report);
        models.Report.hasMany(models.Visit);
      }
    }
  });
