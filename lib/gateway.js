'use strict';

const { GatewayClient } = require('@dosomething/gateway/server');

let gatewayClient;

function getClient() {
  if (!gatewayClient) {
    gatewayClient = GatewayClient.getNewInstance();
  }
  return gatewayClient;
}

function getConfig() {
  return getClient().config;
}


module.exports = {
  getClient,
  getConfig,
};
