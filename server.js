'use strict';

const express = require('express');
const path = require('path');
const logger = require('heroku-logger');

const app = express();

require('dotenv').config()

app.set('port', process.env.PORT || 3000);

const buildPath = 'client/build';

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, buildPath)));

require('./routes')(app);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, buildPath, 'index.html'));
});

app.listen(app.get('port'), () => {
  logger.info(`Gambit Admin server running at: http://localhost:${app.get('port')}/`);
});
