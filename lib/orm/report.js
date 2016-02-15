'use strict';

module.exports = sequelize =>
  sequelize.define('Report', {

  }, {
    classMethods: {
      associate (models) {
        models.Report.belongsTo(models.User);
        models.Report.belongsTo(models.Path);
      }
    }
  });
