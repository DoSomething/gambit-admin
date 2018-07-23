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
function executeGet(path, query = {}, format = true) {
  const url = `${config.baseUri}/${path}`;
  const auth = config.auth;
  logger.info('executeGet', { url, query });

  return superagent.get(url)
    .query(query)
    .auth(auth.name, auth.pass)
    .then((res) => {
      if (format) return formatResponse(res);
      return res.body;
    })
    .catch(err => err);
}

module.exports.getConversations = function (query) {
  return executeGet('v1/conversations', query);
};

module.exports.getConversationById = function (conversationId) {
  return executeGet(`v1/conversations/${conversationId}`);
};

module.exports.getMessages = function (query) {
  return executeGet('v1/messages', query);
};

module.exports.getBroadcasts = function (query) {
  return executeGet('v2/broadcasts', query, false);
};

module.exports.getBroadcastById = function (broadcastId) {
  return executeGet(`v2/broadcasts/${broadcastId}`, {}, false);
};
