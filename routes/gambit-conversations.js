'use strict';

const express = require('express');
const conversations = require('../lib/gambit-conversations');
const northstar = require('../lib/northstar');
const helpers = require('../lib/helpers');

const router = express.Router();

router.get('/conversations/', (req, res) => {
  return conversations.getConversations(req.query)
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
      req.data.user = user;
      req.data.user.links = {
        aurora: helpers.getAuroraUrlForUserId(userId),
        rogue: helpers.getRogueUrlForUserId(userId),
      };
      if (user.mobilecommons_id) {
        const url = helpers.getMobileCommonsUrlForMobileCommonsId(user.mobilecommons_id);
        req.data.user.links.mobilecommons = url;
      }
      return res.send({ data: req.data });
    })
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/messages', (req, res) => {
  conversations.getMessages(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

module.exports = router;
