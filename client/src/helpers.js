const querystring = require('querystring');
const config = require('./config');

/**
 * Returns localhost API url for given path and query object.
 * @param {string} path
 * @param {object} query
 * @return {string}
 */
function apiUrl(path, query = {}) {
  const endpoint = `/${config.apiPrefix}/${path}`;
  const queryString = querystring.stringify(query);
  const result = `${endpoint}?${queryString}`;

  return result;
}

module.exports.getBroadcastIdUrl = function (broadcastId) {
  return apiUrl(`gambit-conversations/broadcasts/${broadcastId}`);
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

module.exports.getConversationsUrl = function (query) {
  return apiUrl('gambit-conversations/conversations', query);
};

module.exports.getMessagesUrl = function (query) {
  return apiUrl('gambit-conversations/messages', query);
};

/**
 * @param {string} input
 * @return {string}
 */
module.exports.formatSource = function (input) {
  if (!input) {
    return null;
  }
  const smsSource = 'sms';
  if (input.includes(smsSource)) {
    return smsSource;
  }
  return input;
};
