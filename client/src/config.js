const configVars = {
  apiPrefix: 'api',
  dateFormat: 'MM/DD/YY, h:mm:ss a',
  resultsPageSize: 50,
  siteName: process.env.REACT_APP_SITE_NAME  || 'Gambit Local',
};

module.exports = configVars;
