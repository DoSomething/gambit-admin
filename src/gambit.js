/**
 * Gambit API helpers.
 */

/**
 * Returns Gambit URL for given path.
 * @param {string} path
 * @return {string}
 */
module.exports.url = function (path) {
  const uri = process.env.REACT_APP_DS_GAMBIT_CONVERSATIONS_API_BASEURI;

  return `${uri}${path}`;
};
