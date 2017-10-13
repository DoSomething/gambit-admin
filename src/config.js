const configVars = {
  conversationsBaseUri: process.env.REACT_APP_DS_GAMBIT_CONVERSATIONS_API_BASEURI || 'http://localhost:5100/api/v1/',
  siteName: process.env.REACT_APP_SITE_NAME  || 'Gambit Local',
  dateFormat: 'MM/DD/YY, h:mm:ss a',
  resultsPageSize: 50,
};

module.exports = configVars;
