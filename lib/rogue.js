'use strict';

const superagent = require('superagent');
const logger = require('heroku-logger');
const config = require('../config/lib/rogue');

/**
 * @param {string} path
 * @param {object} query
 * @return {Promise}
 */
function executeGet(path, query) {
  const url = `${config.baseUri}/${path}`;
  logger.info('executeGet', { url, query });

  return superagent.get(url)
    .query(query)
    .then(res => res.body)
    .catch(err => err);
}


module.exports.getSignupsForUserId = function (userId) {
  const query = {
    'filter[northstar_id]': userId,
    orderBy: 'desc',
  };
  return executeGet('activity', query);
};
