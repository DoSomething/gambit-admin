'use strict';

const express = require('express');
const logger = require('heroku-logger');

const contentApi = require('../lib/gambit-campaigns');
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
  conversations.getBroadcastById(req.params.id, req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/campaigns', (req, res) => {
  contentApi.getCampaigns()
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/campaigns/:id', (req, res) => {
  contentApi.getCampaignById(req.params.id)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/contentfulEntries', (req, res) => {
  contentApi.getContentfulEntries(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/conversations/', (req, res) => {
  conversations.getConversations(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/defaultTopicTriggers', (req, res) => {
  contentApi.getDefaultTopicTriggers()
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

router.get('/posts', (req, res) => {
  rogue.fetchPosts({ 'filter[post_source]': 'sms', include: 'signup', orderBy: 'desc' })
    .then((apiRes) => {
      req.data = apiRes.data;
      req.data.forEach((post, index) => {
        req.data[index].signupUrl = helpers.getRogueUrlForSignupId(post.signup_id);
      });
      return res.send({ data: req.data });
    })
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/rivescript', (req, res) => {
  conversations.getRivescript(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/signups', (req, res) => {
  rogue.fetchSignups(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/topics', (req, res) => {
  contentApi.getTopics(req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/topics/:id', (req, res) => {
  contentApi.getTopicById(req.params.id, req.query)
    .then(apiRes => res.send(apiRes))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  return northstar.getUserById(req.params.id)
    .then((apiRes) => {
      logger.debug('getUserById success', { userId: apiRes.id });
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
      req.data.conversations = {};
      const userConversations = apiRes.data;
      userConversations.forEach((conversation) => {
        const platform = conversation.platform;
        req.data.conversations[platform] = conversation;
      });
      req.data.signups = [];
      return rogue.fetchSignups({ 'filter[northstar_id]': userId });
    })
    .then((apiRes) => {
      req.data.signups = apiRes.data;
      return res.send({ data: req.data });
    })
    .catch(err => helpers.sendResponseForError(res, err));
});

module.exports = router;
