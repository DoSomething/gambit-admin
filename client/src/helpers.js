const config = require('./config');

/**
 * Namespaces path with the localhost API uri.
 * @param {string} path
 * @return {string}
 */
module.exports.apiUrl = function (path) {
  return `/api/${path}`;
};
