'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Report', {

  }, {
    classMethods: {
      associate (models) {
        models.User.belongsTo(models.User);
        models.Visit.belongsTo(models.Url);
      }
    }
  });
