module.exports = {
  extends: '@dosomething/eslint-config/nodejs/6.x',
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
