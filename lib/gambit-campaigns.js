'use strict';

const superagent = require('superagent');

/**
 * @param {string} path
 * @param {object} query
 * @return {Promise}
 */
function executeGet(path, query) {
  console.log('executeGet', path, query);
  const uri = 'https://gambit-conversations-staging.herokuapp.com/api/v1';
  const url = `${uri}/${path}`;

  return superagent.get(url)
    .query(query)
    .then(res => res.body)
    .catch(err => err);
};

module.exports.getCampaigns = function (query) {
  return executeGet('campaigns', query);
};

module.exports.getCampaignById = function (campaignId) {
  return executeGet(`campaigns/${campaignId}`);
};
