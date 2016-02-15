'use strict';

const Chance = require('chance');
const request = require('supertest');

const chance = new Chance();
const app = require('../services/app');
const orm = require('../services/orm');

describe('create visit', () => {
  beforeEach(() => orm.sync({ force: true }));

  it('should create a visit', () =>
    request(app)
      .post('/visits')
      .send({
        url: chance.url()
      })
      .expect(201)
  );
});
