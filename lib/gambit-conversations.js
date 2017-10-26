'use strict';

const superagent = require('superagent');

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
  console.log('executeGet', path, query);
  const uri = 'https://gambit-conversations-staging.herokuapp.com/api/v1';
  const url = `${uri}/${path}`;
  console.log(url);

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
