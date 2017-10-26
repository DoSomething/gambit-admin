'use strict';

const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const superagent = require('superagent');

function executeGet(endpoint, query) {
  console.log('executeGet', endpoint, query);
  return superagent.get(endpoint)
    .query(query);
}

function sendResponseForError(res, err) {
  return res.send(500).send(err);
}

const gambitCampaignsUri= 'https://ds-mdata-responder-staging.herokuapp.com/v1';
const gambitConversationsUri = 'https://gambit-conversations-staging.herokuapp.com/api/v1';

/**
 * Get Gambit Campaigns.
 */
app.get('/api/campaigns', (req, res) => {
  const url = `${gambitCampaignsUri}/campaigns`;
  return executeGet(url, req.query)
    .then(apiRes => res.send(apiRes.body.data))
    .catch(err => sendResponseForError(res, err));
});

/**
 * Get a single Gambit Campaign.
 */
app.get('/api/campaigns/:id', (req, res) => {
  const url = `${gambitCampaignsUri}/campaigns/${req.params.id}`;
  return executeGet(url)
    .then(apiRes => res.send(apiRes.body.data))
    .catch(err => sendResponseForError(res, err));
});

/**
 * Get Gambit Conversations.
 */
app.get('/api/conversations/', (req, res) => {
  const url = `${gambitConversationsUri}/conversations`;
  return executeGet(url, req.query)
    .then(apiRes => res.send(apiRes.body))
    .catch(err => sendResponseForError(res, err));
});

/**
 * Get a single Gambit Conversation.
 */
app.get('/api/conversations/:id', (req, res) => {
  const url = `${gambitConversationsUri}/conversations/${req.params.id}`;
  return executeGet(url)
    .then(apiRes => res.send(apiRes.body))
    .catch(err => sendResponseForError(res, err));
});

app.get('/api/messages', (req, res) => {
  const url = `${gambitConversationsUri}/messages`;
  return executeGet(url, req.query)
    .then(apiRes => res.send(apiRes.body))
    .catch(err => sendResponseForError(res, err));
});


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
