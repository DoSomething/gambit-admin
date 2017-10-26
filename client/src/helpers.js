const querystring = require('querystring');
const config = require('./config');

/**
 * Returns localhost API url for given path and query object.
 * @param {string} path
 * @param {object} query
 * @return {string}
 */
function apiUrl(path, query) {
  const prefix = 'api';
  let endpoint = `/${prefix}/${path}`;
  if (query) {
    const queryString = querystring.stringify(query);
    endpoint = `${endpoint}?${queryString}`;
  }
  console.log(endpoint);

  return endpoint;
};

module.exports.getMessagesUrl = function (query) {
  return apiUrl('gambit-conversations/messages', query);
};
