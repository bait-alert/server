'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Host', {
    value: { type: DataTypes.TEXT, allowNull: false }
  }, {
    classMethods: {
      associate (models) {
        models.Report.hasMany(models.Path);
      }
    }
  });
