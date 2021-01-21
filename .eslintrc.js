module.exports = {
  // TODO: Update me (this config no longer exists)
  extends: '@dosomething/eslint-config/nodejs/8.x',
  globals: {
    app: true
  },
  rules: {
    'no-underscore-dangle': [
      'error', {
        "allow": [
          // MongoDB ids
          "_id",
          // Front's payload includes this pattern
          "_links"
        ]
      }
    ]
  }
};
