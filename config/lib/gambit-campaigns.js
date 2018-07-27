'use strict';

const configVars = {
  baseUri: process.env.DS_GAMBIT_CAMPAIGNS_API_BASEURI,
  auth: {
    header: 'x-gambit-api-key',
    key: process.env.DS_GAMBIT_CAMPAIGNS_API_KEY,
  },
};

module.exports = configVars;
