'use strict';

const url = require('url');

const Chance = require('chance');
const request = require('supertest');

const chance = new Chance();
const app = require('../services/app');
const orm = require('../services/orm');

describe('create visit', () => {
  beforeEach(() => orm.sync({ force: true }));

  it('should create a visit', () => {
    const visitedUrl = url.parse(chance.url());

    return request(app)
      .post('/visits')
      .send({
        host: visitedUrl.host,
        path: visitedUrl.path
      })
      .expect(201);
  });
});
