'use strict';

const express = require('express');
const conversations = require('../lib/gambit-conversations');
const helpers = require('../lib/helpers');

const router = express.Router();

router.get('/conversations/', (req, res) => {
  return conversations.getConversations(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/conversations/:id', (req, res) => {
  conversations.getConversationById(req.params.id)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/messages', (req, res) => {
  conversations.getMessages(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

module.exports = router;
