'use strict';

const superagent = require('superagent');
const config = require('../config/gambit-campaigns');

/**
 * @param {string} path
 * @param {object} query
 * @return {Promise}
 */
function executeGet(path, query) {
  const url = `${config.baseUri}/${path}`;
  console.log(url, query);

  return superagent.get(url)
    .query(query)
    .then(res => res.body.data)
    .catch(err => err);
};

module.exports.getCampaigns = function (query) {
  return executeGet('campaigns', query);
};

module.exports.getCampaignById = function (campaignId) {
  return executeGet(`campaigns/${campaignId}`);
};
