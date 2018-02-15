'use strict';

/**
 * Imports.
 */
const Northstar = require('@dosomething/northstar-js');
const logger = require('heroku-logger');
const config = require('../config/lib/northstar');

/**
 * Setup.
 */
let client;

/**
 * @return {Object}
 */
module.exports.createNewClient = function createNewClient() {
  const loggerMsg = 'northstar.createNewClient';
  const uri = config.baseUri;

  try {
    client = new Northstar({
      baseURI: uri,
      apiKey: config.apiKey,
    });
    logger.info(`${loggerMsg} success`, { uri });
  } catch (err) {
    logger.error(`${loggerMsg} error`, { errorMessage: err.message });
  }
  return client;
};

/**
 * @return {Object}
 */
module.exports.getClient = function getClient() {
  if (!client) {
    return exports.createNewClient();
  }
  return client;
};

/**
 * @param {string} mobile
 * @return {Promise}
 */
module.exports.getUserByMobile = function (mobile) {
  logger.info('getUserByMobile', { mobile });

  return exports.getClient().Users.get('mobile', mobile);
};

/**
 * @param {string} id
 * @return {Promise}
 */
module.exports.getUserById = function (id) {
  logger.info('getUserById', { id });

  return exports.getClient().Users.get('id', id);
};
