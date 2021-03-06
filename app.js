'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('heroku-logger');

const app = express();

require('dotenv').config();

const config = require('./server/config/app');

app.set('port', config.port);

const buildPath = config.buildPath;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, buildPath)));

// parse application/json Content-Type
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded Content-Type
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes & start it up!
(async () => {
  /* eslint-disable global-require */
  const graphql = require('./server/lib/graphql');
  const schema = await graphql.fetchSchema();

  app.use(await require('./server/routes/auth')({ schema }));
  app.use('/api', require('./server/routes/api'));
  /* eslint-enable */

  // All remaining requests return the React app.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, buildPath, 'index.html'));
  });

  app.listen(app.get('port'), () => {
    logger.info(`Gambit Admin server running on port ${app.get('port')}`);
  });
})();
