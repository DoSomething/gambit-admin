'use strict';

const auth = require('basic-auth');
const config = require('../../config/lib/middleware/authenticate');

/**
 * @param {object} user
 * @return {boolean}
 */
function validateBasicAuth(user) {
  const auth = config.auth;
  return (user.name === auth.name && user.pass === auth.pass);
}

function sendUnauthorizedResponse(req, res) {
  res.setHeader('WWW-Authenticate', 'Basic');
  return res.status(401).send(auth.unauthorizedErrorMessage);
}

module.exports = function authenticate() {
  return (req, res, next) => {
    const user = auth(req) || {};

    if (!validateBasicAuth(user)) {
      return sendUnauthorizedResponse(req, res);
    }

    return next();
  };
};
