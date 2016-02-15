'use strict';

const orm = require('../lib/orm');

orm.sync({ force: true })
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
