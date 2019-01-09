'use strict';

const superagent = require('superagent');
const logger = require('heroku-logger');
const config = require('../config/services').gambitContent;

/**
 * @param {string} path
 * @param {object} query
 * @return {Promise}
 */
function executeGet(path, query) {
  const url = `${config.baseUri}/${path}`;
  logger.info('executeGet', { url, query });

  return superagent.get(url)
    .set(config.auth.header, config.auth.key)
    .query(query)
    .then(res => res.body.data);
}

module.exports.getCampaigns = function (query) {
  return executeGet('campaigns', query);
};

module.exports.getCampaignById = function (campaignId) {
  return executeGet(`campaigns/${campaignId}`);
};

module.exports.getContentfulEntries = function (query) {
  return executeGet('contentfulEntries', query);
};

module.exports.getDefaultTopicTriggers = function (query) {
  return executeGet('defaultTopicTriggers', query);
};

module.exports.getTopics = function (query) {
  return executeGet('topics', query);
};

module.exports.getTopicById = function (topicId, query) {
  return executeGet(`topics/${topicId}`, query);
};