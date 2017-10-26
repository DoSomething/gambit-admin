const querystring = require('querystring');
const config = require('./config');

/**
 * Returns localhost API url for given path and query object.
 * @param {string} path
 * @param {object} query
 * @return {string}
 */
function apiUrl(path, query = {}) {
  const prefix = 'api';
  let endpoint = `/${prefix}/${path}`;
  const queryString = querystring.stringify(query);
  endpoint = `${endpoint}?${queryString}`;

  return endpoint;
};

module.exports.getCampaignIdUrl = function (campaignId) {
  return apiUrl(`gambit-campaigns/campaigns/${campaignId}`);
};

module.exports.getCampaignsUrl = function (query) {
  return apiUrl('gambit-campaigns/campaigns', query);
};

module.exports.getConversationIdUrl = function (conversationId) {
  return apiUrl(`gambit-conversations/conversations/${conversationId}`);
};

module.exports.getCampaignsUrl = function (query) {
  return apiUrl('gambit-campaigns/campaigns', query);
};

module.exports.getMessagesUrl = function (query) {
  return apiUrl('gambit-conversations/messages', query);
};

