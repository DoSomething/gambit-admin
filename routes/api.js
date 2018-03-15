'use strict';

const express = require('express');
const logger = require('heroku-logger');
const campaigns = require('../lib/gambit-campaigns');
const conversations = require('../lib/gambit-conversations');
const northstar = require('../lib/northstar');
const rogue = require('../lib/rogue');
const helpers = require('../lib/helpers');

const router = express.Router();

router.get('/broadcasts', (req, res) => {
  conversations.getBroadcasts(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/broadcasts/:id', (req, res) => {
  conversations.getBroadcastById(req.params.id)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/campaigns', (req, res) => {
  campaigns.getCampaigns()
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/campaigns/:id', (req, res) => {
  campaigns.getCampaignById(req.params.id)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/conversations/', (req, res) => {
  conversations.getConversations(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/messages', (req, res) => {
  conversations.getMessages(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  return northstar.getUserById(req.params.id)
    .then((apiRes) => {
      req.data = apiRes;
      req.data.links = {
        aurora: helpers.getAuroraUrlForUserId(userId),
        customerIo: helpers.getCustomerIoUrlForUserId(userId),
      };
      // TODO: If we didn't find any Conversations, it may because Conversations exist without a
      // userId, and the Conversation hasn't been updated since Conversations 2.3.1 was released.
      // @see https://github.com/DoSomething/gambit-conversations/releases/tag/2.3.1
      return conversations.getConversations(`query={"userId":"${userId}"}`);
    })
    .then((apiRes) => {
      req.data.conversations = apiRes;
      logger.info('data', { data: req.data });
      return rogue.getSignupsForUserId(userId);
    })
    .then((apiRes) => {
      req.data.signups = apiRes;
      req.data.signups.data.forEach((signup, index) => {
        req.data.signups.data[index].url = helpers.getRogueUrlForSignupId(signup.signup_id);
      });
      return res.send({ data: req.data });
    })
    .catch(err => helpers.sendResponseForError(res, err));
});

module.exports = router;
