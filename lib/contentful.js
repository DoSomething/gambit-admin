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
 * @return {Promise}
 */
async function getBroadcasts() {
  const query = { order: '-sys.createdAt' };
  query['sys.contentType.sys.id[in]'] = config.broadcastTypes.join(',');

  const res = await client.getEntries(query);

  const data = res.items.map(transformBroadcast);

  return { data };
}

module.exports = {
  getBroadcasts,
}
