'use strict';

const express = require('express');
const logger = require('heroku-logger');
const lodash = require('lodash');

const contentful = require('../lib/contentful');
const conversations = require('../lib/gambit-conversations');
const helpers = require('../lib/helpers');

const router = express.Router();

// Check authentication.
router.use('/', (req, res, next) => {
  const validRoles = ['admin', 'staff'];
  if (validRoles.includes(lodash.get(req, 'session.passport.user.role'))) {
    return next();
  }
  return res.sendStatus(401);
});

router.get('/broadcasts', (req, res) => {
  contentful.getBroadcasts(req.query.skip)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/broadcasts/:id', (req, res) => {
  conversations.getBroadcastById(req.params.id, req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/campaigns/:id/topics', (req, res) => {
  contentful.getCampaignTopics(req.params.id)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/conversations/', (req, res) => {
  conversations.getConversations(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/draftSubmissions', (req, res) => {
  conversations.getDraftSubmissions(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/draftSubmissions/:id', (req, res) => {
  conversations.getDraftSubmissionById(req.params.id, req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/messages', (req, res) => {
  conversations.getMessages(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.post('/messages', (req, res) => {
  conversations.postMessages(req.query, req.body)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/rivescript', (req, res) => {
  conversations.getRivescript(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

module.exports = router;
