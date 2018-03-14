const querystring = require('querystring');
const config = require('./config');

module.exports = {
  /**
   * Returns localhost API url for given path and query object.
   * @param {string} path
   * @param {object} query
   * @return {string}
   */
  apiUrl: function apiUrl(path, query = {}) {
    const endpoint = `/${config.apiPrefix}/${path}`;
    const queryString = querystring.stringify(query);
    const result = `${endpoint}?${queryString}`;
    return result;
  },
  getBroadcastByIdPath: function getBroadcastByIdPath(broadcastId) {
    return `${this.getBroadcastsPath()}/${broadcastId}`;
  },
  getBroadcastsPath: function getBroadcastsPath() {
    return `broadcasts`;
  },
  getCampaignByIdPath: function getCampaignByIdPath(campaignId) {
    return `${this.getCampaignsPath()}/${campaignId}`;
  },
  getCampaignsPath: function getCampaignsPath() {
    return 'campaigns';
  },
  getConversationByIdPath: function getConversationByIdPath(conversationId) {
    return `${this.getConversationsPath()}/${conversationId}`;
  },
  getConversationsPath: function getConversationsPath() {
    return `conversations`;
  },
  getMessagesPath: function getConversationsPath() {
    return `messages`;
  },
  getUserByIdPath: function getUserByIdPath(userId) {
    return `users/${userId}`;
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
