'use strict';

// Routes
const gambitCampaignsRoute = require('./gambit-campaigns');
const gambitConversationsRoute = require('./gambit-conversations');

// Middleware
const authenticateMiddleware = require('../lib/middleware/authenticate');

module.exports = function init(app) {
  app.use(authenticateMiddleware());
  app.use('/api/gambit-campaigns', gambitCampaignsRoute);
  app.use('/api/gambit-conversations', gambitConversationsRoute);
};
