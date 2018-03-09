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

const conversations = 'gambit-conversations';
const campaigns = 'gambit-campaigns';

module.exports = {
  apiUrl,
  getBroadcastByIdPath: function getBroadcastByIdPath(broadcastId) {
    return `${this.getBroadcastsPath()}/${broadcastId}`;
  },
  getBroadcastsPath: function getBroadcastsPath() {
    return `${conversations}/broadcasts`;
  },
  getCampaignByIdPath: function getCampaignByIdPath(campaignId) {
    return `${this.getCampaignsPath()}/${campaignId}`;
  },
  getCampaignsPath: function getCampaignsPath() {
    return `${campaigns}/campaigns`;
  },
  getConversationByIdPath: function getConversationByIdPath(conversationId) {
    return `${this.getConversationsPath()}/${conversationId}`;
  },
  getConversationsPath: function getConversationsPath() {
    return `${conversations}/conversations`;
  },
  getMessagesPath: function getConversationsPath() {
    return `${conversations}/messages`;
  },
};


module.exports.getUserIdentifierForConversation = function (conversation) {
  if (conversation.userId) {
    return conversation.userId;
  }
  return conversation.platformUserId;
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

/**
 * @param {object} broadcast
 * @return {string}
 */
module.exports.broadcastName = function (broadcast) {
  if (broadcast.name) {
    return broadcast.name;
  }

  return broadcast.id;
};
