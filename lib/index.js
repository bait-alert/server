'use strict';

const koa = require('koa');
const cors = require('kcors');

const routers = require('./routers');

const app = koa();

app.use(cors());
app.use(routers.routes());

module.exports = app;
