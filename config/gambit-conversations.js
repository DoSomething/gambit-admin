'use strict';

const configVars = {
  auth: {
    name: process.env.DS_GAMBIT_CONVERSATIONS_API_BASIC_AUTH_NAME,
    pass: process.env.DS_GAMBIT_CONVERSATIONS_API_BASIC_AUTH_PASS,
  },
  baseUri: process.env.DS_GAMBIT_CONVERSATIONS_API_BASEURI,
};

module.exports = configVars;
