'use strict';

const compose = require('koa-compose');
const validator = require('koa-joi-validator');

const orm = require('../../orm');
const identify = require('../../middlewares/identify');

module.exports.path = '/';
module.exports.method = 'post';

module.exports.handler = compose([
  identify(),
  validator.validate({
    type: 'json',
    body: {
      host: validator.Joi.string().required(),
      path: validator.Joi.string().required()
    }
  }),
  function * createReport () {
    const host = yield orm.models.Host.findOrCreate({
      where: { value: this.request.body.host },
      defaults: { value: this.request.body.host }
    });

    const path = yield orm.models.Path.findOrCreate({
      where: { value: this.request.body.path },
      defaults: { value: this.request.body.path },
      HostId: host[0].id
    });

    const report = yield orm.models.Report.create({
      PathId: path[0].id
    });

    if (this.state.user) {
      yield report.setUser(this.state.user);
    }

    this.status = 201;
    this.body = report.toJSON();
  }
]);
