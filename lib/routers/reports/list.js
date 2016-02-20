'use strict';

const compose = require('koa-compose');
const validator = require('koa-joi-validator');

const orm = require('../../orm');
const identify = require('../../middlewares/identify');

module.exports.path = '/';
module.exports.method = 'get';

module.exports.handler = compose([
  identify(),
  validator.validate({
    type: 'json',
    query: {
      host: validator.Joi.string().required(),
      path: validator.Joi.string().required()
    }
  }),
  function * createReport () {
    console.log('rq', this.request.query);
    console.log('q', this.query);

    const host = yield orm.models.Host.findOrCreate({
      where: { value: this.request.query.host },
      defaults: { value: this.request.query.host }
    }).get(0);

    const path = yield orm.models.Path.findOrCreate({
      where: { value: this.request.query.path },
      defaults: { value: this.request.query.path },
      HostId: host.id
    }).get(0);

    const reports = yield path.getReports()
      .map(report => report.toJSON());

    this.status = 200;
    this.body = reports;
  }
]);
