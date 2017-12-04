'use strict';

const superagent = require('superagent');
const logger = require('heroku-logger');
const config = require('../config/lib/gambit-conversations');

/**
 * @param {object} res - Express response
 * @return {object}
 */
function formatResponse(res) {
  const result = {
    data: res.body,
    pagination: {
      total: 0,
    },
  };
  const total = res.header['x-gambit-results-count'];
  if (total) {
    result.pagination.total = Number(total);
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
  const auth = config.auth;
  logger.info('executeGet', { url, query });

  return superagent.get(url)
    .query(query)
    .auth(auth.name, auth.pass)
    .then(res => formatResponse(res))
    .catch(err => err);
}

module.exports.getConversations = function (query) {
  return executeGet('conversations', query);
};

module.exports.getConversationById = function (conversationId) {
  return executeGet(`conversations/${conversationId}`);
};

module.exports.getMessages = function (query) {
  return executeGet('messages', query);
};

module.exports.getBroadcastById = function (broadcastId) {
  return executeGet(`broadcast-settings/${broadcastId}`);
};
