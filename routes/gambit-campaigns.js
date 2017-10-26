'use strict';

const express = require('express');
const campaigns = require('../lib/gambit-campaigns');
const helpers = require('../lib/helpers');

const router = express.Router();

router.get('/campaigns', (req, res) => {
  campaigns.getCampaigns()
    .then(apiRes => res.send(apiRes.body.data))
    .catch(err => helpers.sendResponseForError(res, err));
});

router.get('/campaigns/:id', (req, res) => {
  campaigns.getCampaignById(req.params.id)
    .then(apiRes => res.send(apiRes.body.data))
    .catch(err => helpers.sendResponseForError(res, err));
});

module.exports = router;
