'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Visit', {
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, {
    classMethods: {
      associate (models) {
        models.Visit.belongsTo(models.User);
        models.Visit.belongsTo(models.Path);
      }
    }
  });
