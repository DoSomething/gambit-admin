'use strict';

const superagent = require('superagent');
const logger = require('heroku-logger');
const config = require('../config/lib/gambit-conversations');

/**
 * @param {object} res - Express response
 * @return {object}
 */
function formatV1IndexResponse(res) {
  const total = Number(res.header[config.resultsCountHeader]) || 0;
  return {
    data: res.body,
    meta: {
      pagination: {
        total,
      },
    },
  };
}

/**
 * @param {string} path
 * @param {object} query
 * @return {Promise}
 */
function executeGet(path, query = {}) {
  const url = `${config.baseUri}/${path}`;
  logger.info('executeGet', { url, query });

  return superagent.get(url)
    .query(query)
    .auth(config.auth.name, config.auth.pass);
}

module.exports.getConversations = function (query) {
  return executeGet('v1/conversations', query)
    .then(res => formatV1IndexResponse(res));
};

module.exports.getConversationById = function (conversationId) {
  return executeGet(`v1/conversations/${conversationId}`)
    .then(res => res.body);
};

module.exports.getMessages = function (query) {
  return executeGet('v1/messages', query)
    .then(res => formatV1IndexResponse(res));
};

module.exports.getBroadcasts = function (query) {
  return executeGet('v2/broadcasts', query)
    .then(res => res.body);
};

module.exports.getBroadcastById = function (broadcastId, query) {
  return executeGet(`v2/broadcasts/${broadcastId}`, query)
    .then(res => res.body);
};

module.exports.getRivescript = function (query) {
  return executeGet('v2/rivescript', query)
    .then(res => res.body);
};
