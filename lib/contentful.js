'use strict';

const contentful = require('contentful');
const config = require('../config/services').contentful;

const client = contentful.createClient(config.client);

/**
 * @param {Object} json
 * @return {Object}
 */
function transformBroadcast(json) {
  return {
    id: json.sys.id,
    name: json.fields.name,
    type: json.sys.contentType.sys.id,
    text: json.fields.text,
  };
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

module.exports = {
  getBroadcasts,
}
