'use strict';

const configVars = {
  auth: {
    name: process.env.DS_GAMBIT_ADMIN_BASIC_AUTH_NAME || 'puppet',
    pass: process.env.DS_GAMBIT_ADMIN_BASIC_AUTH_PASS || 'sloth',
  },
  unauthorizedErrorMessage: 'Invalid or missing login.',
};

module.exports = configVars;
