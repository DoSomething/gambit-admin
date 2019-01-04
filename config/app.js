'use strict';

const configVars = {
  appUrl: process.env.APP_URL,
  buildPath: 'client/build',
  port: process.env.PORT || 3000,
  // Only used when running client as a separate server (local development).
  webUrl: process.env.WEB_URL,
};

module.exports = configVars;
