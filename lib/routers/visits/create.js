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
      url: validator.Joi.string().uri().required()
    }
  }),
  function * createVisit () {
    const url = yield orm.models.Url.findOrCreate({
      where: { value: this.request.body.url },
      defaults: { value: this.request.body.url }
    });

    const visit = yield orm.models.Visit.create({
      UrlId: url.id
    });

    if (this.state.user) {
      yield visit.setUser(this.state.user);
    }

    this.status = 201;
    this.body = visit.toJSON();
  }
]);
