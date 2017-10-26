'use strict';

// Routes
const gambitCampaignsRoute = require('./gambit-campaigns');
const gambitConversationsRoute = require('./gambit-conversations');

module.exports = function init(app) {
  app.use('/api/gambit-campaigns', gambitCampaignsRoute);
  app.use('/api/gambit-conversations', gambitConversationsRoute);
};
