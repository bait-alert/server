'use strict';

module.exports = sequelize =>
  sequelize.define('Report', {

  }, {
    classMethods: {
      associate (models) {
        models.User.belongsTo(models.User);
        models.Visit.belongsTo(models.Url);
      }
    }
  });
