const configVars = {
  apiPrefix: 'api',
  dateFormat: 'MM/DD/YY, h:mm:ss a',
  resultsPageSize: 50,
  siteName: 'Gambit',
  twilio: {
    errorLinkBaseUrl: 'https://www.twilio.com/docs/api/errors',
  },
  outboundMessage: {
    statuses: {
      legacySent: 'legacySent',
      queued: 'queued',
      delivered: 'delivered',
      failed: 'failed',
    },
    dateProperties: {
      queued: 'queuedAt',
      delivered: 'deliveredAt',
      failed: 'failedAt',
    },
    labels: {
      style: {
        legacySent: 'default',
        queued: 'primary',
        delivered: 'success',
        failed: 'danger',
      },
      text: {
        legacySent: 'Sent',
        queued: 'Queued',
        delivered: 'Delivered',
        failed: 'Failed',
      },
    },
  },
};

module.exports = configVars;
