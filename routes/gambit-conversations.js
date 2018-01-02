'use strict';

const express = require('express');
const conversations = require('../lib/gambit-conversations');
const northstar = require('../lib/northstar');
const rogue = require('../lib/rogue');
const helpers = require('../lib/helpers');

const router = express.Router();

router.get('/conversations/', (req, res) => {
  conversations.getConversations(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/conversations/:id', (req, res) => {
  conversations.getConversationById(req.params.id)
    .then((apiRes) => {
      req.data = apiRes.data;
      if (req.data.platform !== 'sms') {
        return Promise.resolve(null);
      }
      return northstar.getUserByMobile(req.data.platformUserId);
    })
    .then((user) => {
      if (!user) {
        return res.send({ data: req.data });
      }
      req.data.user = user;
      const userId = user.id;
      req.data.user.links = {
        aurora: helpers.getAuroraUrlForUserId(userId),
      };
      return rogue.getSignupsForUserId(userId);
    })
    .then((apiRes) => {
      req.data.user.signups = apiRes;
      req.data.user.signups.data.forEach((signup, index) => {
        req.data.user.signups.data[index].url = helpers.getRogueUrlForSignupId(signup.signup_id);
      });
      return res.send({ data: req.data });
    })
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/messages', (req, res) => {
  conversations.getMessages(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

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

module.exports = router;
