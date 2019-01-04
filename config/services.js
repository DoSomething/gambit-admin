'use strict';

module.exports = {
  gambitConversations: {
    auth: {
      name: process.env.DS_GAMBIT_CONVERSATIONS_API_BASIC_AUTH_NAME,
      pass: process.env.DS_GAMBIT_CONVERSATIONS_API_BASIC_AUTH_PASS,
    },
    baseUri: process.env.DS_GAMBIT_CONVERSATIONS_API_BASEURI,
    // @see https://github.com/DoSomething/gambit-conversations/blob/7bab3025e38630b938cba844c6755bba5c2373e7/config/app/routes/mongoose.js#L4
    resultsCountHeader: 'x-gambit-results-count',
  },
  gambitContent: {
    baseUri: process.env.DS_GAMBIT_CAMPAIGNS_API_BASEURI,
    auth: {
      header: 'x-gambit-api-key',
      key: process.env.DS_GAMBIT_CAMPAIGNS_API_KEY,
    },
  },
  // TODO: Add OAuth vars.
  northstar: {

  },
};
