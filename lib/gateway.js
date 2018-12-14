'use strict';

const { GraphQLClient } = require('graphql-request');
const { GatewayClient } = require('@dosomething/gateway/server');

let gatewayClient;
let graphQLClient;

const graphQLUrl = 'https://graphql-qa.dosomething.org/graphql';

function getClient() {
  if (!gatewayClient) {
    gatewayClient = GatewayClient.getNewInstance();
    gatewayClient.strategies[0].on('token-set', (accessToken) => {
      graphQLClient = new GraphQLClient(graphQLUrl, {
        headers: { Authorization: `Bearer ${accessToken.access_token}` },
      });
    });
    return gatewayClient;
  }
  return gatewayClient;
}

function getConfig() {
  return getClient().config;
}

/**
 * @param {String} graphQLString
 * @return {Promise}
 */
function getGraphQL(graphQLString) {
  return graphQLClient.request(graphQLString);
}

module.exports = {
  getClient,
  getGraphQL,
  getConfig,
};
