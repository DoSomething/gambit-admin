const config = require('./config');

/**
 * Returns Gambit URL for given path.
 * @param {string} path
 * @return {string}
 */
module.exports.conversationsUrl = function (path) {
  return `${config.conversationsBaseUri}${path}`;
};
