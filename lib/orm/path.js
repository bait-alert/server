'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Path', {
    value: { type: DataTypes.TEXT, allowNull: false }
  }, {
    classMethods: {
      associate (models) {
        models.Path.belongsTo(models.Host);
        models.Path.hasMany(models.Report);
        models.Path.hasMany(models.Visit);
      }
    }
  });
