module.exports = {
  extends: '@dosomething/eslint-config/nodejs/6.x',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], 
  },
  env: {
    browser: true,
    node: true,
  },
};
