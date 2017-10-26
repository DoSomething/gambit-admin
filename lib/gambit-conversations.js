'use strict';

const superagent = require('superagent');
const config = require('../config/gambit-conversations');

/**
 * @param {object} res - Express response
 * @return {object}
 */
function formatResponse(res) {
  const result = {
    data: res.body,
  };
  const total = res.header['x-gambit-results-count'];
  if (total) {
    result.pagination = { total: Number(res.header['x-gambit-results-count']) };
  }

  return result;
}

/**
 * @param {string} path
 * @param {object} query
 * @return {Promise}
 */
function executeGet(path, query = {}) {
  const url = `${config.baseUri}/${path}`;

  return superagent.get(url)
    .query(query)
    .then(res => formatResponse(res))
    .catch(err => err);
};

module.exports.getConversations = function (query) {
  return executeGet('conversations', query);
};

module.exports.getConversationById = function (conversationId) {
  return executeGet(`conversations/${conversationId}`);
};

module.exports.getMessages = function (query) {
  return executeGet('messages', query);
};
