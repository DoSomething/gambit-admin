'use strict';

module.exports = {
  contentful: {
    client: {
      space:  process.env.GAMBIT_CONTENTFUL_SPACE_ID,
      accessToken: process.env.GAMBIT_CONTENTFUL_ACCESS_TOKEN,
    },
    broadcastTypes: [
      'autoReplyBroadcast',
      'askSubscriptionStatus',
      'askVotingPlanStatus',
      'askYesNo',
      'photoPostBroadcast',
      'textPostBroadcast',
    ],
  },
  gambitContent: {
    baseUri: process.env.DS_GAMBIT_CAMPAIGNS_API_BASEURI,
    auth: {
      header: 'x-gambit-api-key',
      key: process.env.DS_GAMBIT_CAMPAIGNS_API_KEY,
    },
  },
  gambitConversations: {
    auth: {
      name: process.env.DS_GAMBIT_CONVERSATIONS_API_BASIC_AUTH_NAME,
      pass: process.env.DS_GAMBIT_CONVERSATIONS_API_BASIC_AUTH_PASS,
    },
    baseUri: process.env.DS_GAMBIT_CONVERSATIONS_API_BASEURI,
    // @see https://github.com/DoSomething/gambit-conversations/blob/7bab3025e38630b938cba844c6755bba5c2373e7/config/app/routes/mongoose.js#L4
    resultsCountHeader: 'x-gambit-results-count',
  },
  graphQL: {
    url: process.env.DS_GRAPHQL_URL,
  },
  northstar: {
    url: process.env.DS_API_OAUTH_URL,
    clientId: process.env.DS_API_OAUTH_CLIENT_ID,
    clientSecret: process.env.DS_API_OAUTH_CLIENT_SECRET,
    scopes: process.env.DS_API_OAUTH_SCOPES,
  },
};
