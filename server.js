'use strict';

const express = require('express');
const path = require('path');
const logger = require('heroku-logger');

const app = express();

require('dotenv').config();

const config = require('./config/server');

app.set('port', config.port);

const buildPath = config.buildPath;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, buildPath)));

require('./routes')(app);

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, buildPath, 'index.html'));
});

app.listen(app.get('port'), () => {
  logger.info(`Gambit Admin server running on port ${app.get('port')}`);
});
