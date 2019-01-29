const lodash = require('lodash');
const querystring = require('querystring');
const config = require('./config');

/**
 * @param {Array} defaultTopicTriggers
 * @return {Object}
 */
function getCampaignsByStatus(defaultTopicTriggers) {
  const campaignsById = {};
  // Alphabetize triggers and save campaigns that have topic change triggers.
  lodash.orderBy(defaultTopicTriggers, 'trigger').forEach((trigger) => {
    const topic = trigger.topic;
    const hasCampaign = topic && topic.campaign && topic.campaign.id;
    if (hasCampaign) {
      const campaign = topic.campaign;
      if (campaignsById[campaign.id]) {
        campaignsById[campaign.id].triggers.push(trigger);
        return;
      }
      campaignsById[campaign.id] = Object.assign(campaign, { triggers: [trigger] });
    }
  });
  return lodash.groupBy(Object.values(campaignsById), 'status');
}

/**
 * @return {Array}
 */
function getHardcodedTopics() {
  return [
    'ask_subscription_status',
    'askSubscriptionStatus',
    'campaign',
    'flsa',
    'random',
    'support',
    'survey_response',
    'tmi_completed',
    'tmi_level1',
    'unsubscribed',
  ];
}

/**
 * @param {String}
 * @return {String}
 */
function getContentfulUrlForEntryId(entryId) {
  return `https://app.contentful.com/spaces/owik07lyerdj/entries/${entryId}`;
}

module.exports = {
  /**
   * Returns localhost API url for given path and query object.
   * @param {string} path
   * @param {object} query
   * @return {string}
   */
  apiUrl: function apiUrl(path, query = {}) {
    const endpoint = `/${config.apiPrefix}/${path}`;
    const queryString = querystring.stringify(query);
    const result = `${endpoint}?${queryString}`;
    return result;
  },
  getBroadcastByIdPath: function getBroadcastByIdPath(broadcastId) {
    return `${this.getBroadcastsPath()}/${broadcastId}`;
  },
  getCampaignsByStatus,
  getContentfulEntriesPath: function getCampaignsPath() {
    return 'contentfulEntries';
  },
  getContentfulUrlForEntryId,
  getConversationByIdPath: function getConversationByIdPath(conversationId) {
    return `${this.getConversationsPath()}/${conversationId}`;
  },
  getConversationsPath: function getConversationsPath() {
    return 'conversations';
  },
  getDefaultPageSize: function getDefaultPageSize() {
    return 25;
  },
  getDefaultTopicTriggersPath: function getDefaultTopicTriggersPath() {
    return 'defaultTopicTriggers';
  },
  getDraftSubmissionByIdPath: function getDraftSubmissionsPath(draftSubmissionId) {
    return `${this.getDraftSubmissionsPath()}/${draftSubmissionId}`;
  },
  getDraftSubmissionsPath: function getDraftSubmissionsPath() {
    return 'draftSubmissions';
  },
  getHardcodedTopics,
  getMessagesPath: function getMessagesPath() {
    return 'messages';
  },
  getRivescriptPath: function getRivescriptPath() {
    return 'rivescript';
  },
  getTopicsByCampaignIdPath: function getTopicsByCampaignIdPath(campaignId) {
    return `campaigns/${campaignId}/topics`;
  },
  getUserByIdPath: function getUserByIdPath(userId) {
    return `users/${userId}`;
  },
};

module.exports.message = {
  isInbound: function isInbound(message = {}) {
    return message.direction === 'inbound';
  },
  getCreationDate: function getCreationDate(message = {}) {
    return message.createdAt;
  },
  getDeliveryMetadata: function getDeliveryMetadata(message = {}) {
    return message.metadata ? message.metadata.delivery : false;
  },
  outbound: {
    getQueuedAtDate: function getQueuedAtDate(deliveryMetadata = {}) {
      return deliveryMetadata.queuedAt;
    },
    getDeliveredAtDate: function getDeliveredAtDate(deliveryMetadata = {}) {
      return deliveryMetadata.deliveredAt;
    },
    getDeliveryStatus: function getDeliveryStatus(deliveryMetadata = {}) {
      if (deliveryMetadata.failedAt) {
        return config.outboundMessage.statuses.failed;
      } else if (deliveryMetadata.deliveredAt) {
        return config.outboundMessage.statuses.delivered;
      }
      return config.outboundMessage.statuses.queued;
    },
    getDateFromDeliveryStatus: function getDateFromDeliveryStatus(status, deliveryMetadata = {}) {
      return deliveryMetadata[config.outboundMessage.dateProperties[status]];
    },
    getDeliveryErrorLink: function getDeliveryErrorLink(failedDeliveryMetadata) {
      const errorCode = module.exports.message.outbound
        .getDeliveryErrorCode(failedDeliveryMetadata);
      return `${config.twilio.errorLinkBaseUrl}/${errorCode}`;
    },
    getDeliveryErrorCode: function getDeliveryErrorCode(failedDeliveryMetadata) {
      if (failedDeliveryMetadata && failedDeliveryMetadata.failureData) {
        return failedDeliveryMetadata.failureData.code;
      }
      return false;
    },
    isFailedDeliveryStatus: function isFailedDeliveryStatus(status) {
      return status === config.outboundMessage.statuses.failed;
    },
    isDeliveredStatus: function isDeliveredStatus(status) {
      return status === config.outboundMessage.statuses.delivered;
    },
    getDeliveryDisplaySettings: function getDeliveryDisplaySettings(message = {}) {
      const deliveryMetadata = module.exports.message.getDeliveryMetadata(message);
      let { date, status, labelText, labelStyle, errorLink } = false;

      if (deliveryMetadata) {
        status = module.exports.message.outbound.getDeliveryStatus(deliveryMetadata);
        date = module.exports.message.outbound.getDateFromDeliveryStatus(status, deliveryMetadata);
      } else {
        status = config.outboundMessage.statuses.legacySent;
        date = module.exports.message.getCreationDate(message);
      }

      if (module.exports.message.outbound.isFailedDeliveryStatus(status)) {
        errorLink = module.exports.message.outbound.getDeliveryErrorLink(deliveryMetadata);
      }

      labelText = config.outboundMessage.labels.text[status];
      labelStyle = config.outboundMessage.labels.style[status];

      return { date, status, labelText, labelStyle, errorLink };
    },
  },
};

module.exports.getUserIdentifierForConversation = function (conversation) {
  if (conversation.userId) {
    return conversation.userId;
  }
  return conversation.platformUserId;
};

/**
 * @param {string} input
 * @return {string}
 */
module.exports.formatSource = function (input) {
  if (!input) {
    return null;
  }
  const smsSource = 'sms';
  if (input.includes(smsSource)) {
    return smsSource;
  }
  return input;
};

/**
 * @param {object} broadcast
 * @return {string}
 */
module.exports.broadcastName = function (broadcast) {
  if (broadcast.name) {
    return broadcast.name;
  }

  return broadcast.id;
};
