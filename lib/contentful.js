'use strict';

const contentful = require('contentful');
const config = require('../config/services').contentful;

const client = contentful.createClient(config.client);

/**
 * @param {Object} json
 * @return {Object}
 */
function transformTopic(json) {
  return {
    id: json.sys.id,
    name: json.fields.name,
    type: json.sys.contentType.sys.id,
    createdAt: json.sys.createdAt,
  };
}

/**
 * @param {Object} json
 * @return {Object}
 */
function transformBroadcast(json) {
  return Object.assign(transformTopic(json), { text: json.fields.text });
}

/**
 * @param {Number} skip
 * @return {Promise}
 */
async function getBroadcasts(skip = 0) {
  const query = { order: '-sys.createdAt', skip, limit: 50 };
  query['sys.contentType.sys.id[in]'] = config.broadcastTypes.join(',');

  const res = await client.getEntries(query);

  return {
    meta: {
      pagination: {
        total: res.total,
        skip: res.skip,
        limit: res.limit,
      },
    },
    data: res.items.map(transformBroadcast),
  };
}

/**
 * @param {Number} campaignId
 * @return {Promise}
 */
async function getCampaignTopics(campaignId) {
  // TODO: Cache this response.
  const fetchCampaignRes = await client.getEntries({
    content_type: 'campaign',
    'fields.campaignId': campaignId,
  });
  const campaignEntry = fetchCampaignRes.items[0];
  const contentfulId = campaignEntry.sys.id;

  // Contentful only allows querying by one content_type, which means we need to make
  // three separate requests to find all possible topics for this campaign.
  const fetchAutoReplyTopicsRes = await client.getEntries({
    'fields.campaign.sys.id': contentfulId,
    content_type: 'autoReply',
  });
  const fetchPhotoPostTopicsRes = await client.getEntries({
    'fields.campaign.sys.id': contentfulId,
    content_type: 'photoPostConfig',
  });
  const fetchTextPostTopicsRes = await client.getEntries({
    'fields.campaign.sys.id': contentfulId,
    content_type: 'textPostConfig',
  });

  const topics = fetchAutoReplyTopicsRes.items.map(transformTopic)
    .concat(fetchPhotoPostTopicsRes.items.map(transformTopic))
    .concat(fetchTextPostTopicsRes.items.map(transformTopic));

  return { data: topics.sort((a,b) => b.createdAt - a.createdAt) }
}

module.exports = {
  getBroadcasts,
  getCampaignTopics,
}
