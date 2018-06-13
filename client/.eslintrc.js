module.exports = {
  extends: '@dosomething/eslint-config/nodejs/8.x',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': [
      'error', {
        'allow': ['_id'],
      },
    ],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
