'use strict';

const express = require('express');

const app = express();

require('dotenv').config()

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

require('./routes')(app);

app.listen(app.get('port'), () => {
  console.log(`Gambit Admin server running at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
