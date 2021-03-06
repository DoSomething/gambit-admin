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
