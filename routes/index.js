'use strict';

// Routes
const apiRoute = require('./gambit-conversations');

// Middleware
const authenticateMiddleware = require('../lib/middleware/authenticate');

module.exports = function init(app) {
  app.use(authenticateMiddleware());
  app.use('/api', apiRoute);
};
