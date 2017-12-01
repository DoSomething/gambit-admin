'use strict';

const logger = require('heroku-logger');

/**
 * Sends response with error code and message
 *
 * @param  {Object} res
 * @param  {Number} code = 200
 * @param  {String} message = 'OK'
 */
module.exports.sendResponseForError = function (res, err) {
  let code = err.status;
  if (!code) {
    code = 500;
  }
  return exports.sendResponseWithStatusCode(res, code, err.message);
};

/**
 * Sends response with custom status code and message
 *
 * @param  {Object} res
 * @param  {Number} code = 200
 * @param  {String} message = 'OK'
 */
module.exports.sendResponseWithStatusCode = function (res, code = 200, message = 'OK') {
  const response = { message };
  if (code > 200) {
    logger.error('sendResponseWithStatusCode', { code, response });
  } else {
    logger.debug('sendResponseWithStatusCode', { code, response });
  }
  return res.status(code).send(response);
};

/**
 * @param {string} userId
 * @return {string}
 */
module.exports.getAuroraUrlForUserId = function (userId) {
  const baseUri = process.env.DS_AURORA_PROFILE_BASEURI;
  const result = `${baseUri}/${userId}`;
  return result;
};

/**
 * @param {string} userId
 * @return {string}
 */
module.exports.getMobileCommonsUrlForMobileCommonsId = function (mobileCommonsId) {
  const baseUri = process.env.MOBILECOMMONS_PROFILE_BASEURI;
  const result = `${baseUri}/${mobileCommonsId}`;
  return result;
};

/**
 * @param {string} userId
 * @return {string}
 */
module.exports.getRogueUrlForUserId = function (userId) {
  const baseUri = process.env.DS_ROGUE_BASEURI;
  const result = `${baseUri}/users/${userId}`;
  return result;
};

/**
 * @param {string} signupId
 * @return {string}
 */
module.exports.getRogueUrlForSignupId = function (signupId) {
  const baseUri = process.env.DS_ROGUE_BASEURI;
  const result = `${baseUri}/signups/${signupId}`;
  return result;
};
