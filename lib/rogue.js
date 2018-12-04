'use strict';

const { RogueClient } = require('@dosomething/gateway/server');

let rogueClient;

function getClient() {
  if (!rogueClient) {
    rogueClient = RogueClient.getNewInstance();
  }
  return rogueClient;
}

function getConfig() {
  return getClient().config;
}

/**
 * fetchSignups
 *
 * @param {Object} query
 * @return {Promise}
 */
function fetchSignups(query) {
  return module.exports.getClient().Signups.index(query);
}

/**
 * getPosts
 *
 * @param {object} query
 * @return {Promise}
 */
function fetchPosts(query) {
  return module.exports.getClient().Posts.index(query);
}

module.exports = {
  getClient,
  getConfig,
  fetchPosts,
  fetchSignups,
};
