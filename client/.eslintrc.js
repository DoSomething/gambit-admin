module.exports = {
  extends: '@dosomething/eslint-config/nodejs/8.x',
  parser: 'babel-eslint',
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
    'jsx-a11y/href-no-hash': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
