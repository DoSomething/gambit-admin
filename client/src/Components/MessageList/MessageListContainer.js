import React from 'react';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import MessageList from './MessageList';

const queryString = require('query-string');
const config = require('../../config');
const helpers = require('../../helpers');

const pageSize = config.resultsPageSize;

class MessageListContainer extends React.Component {
  constructor(props) {
    super(props);

    const apiQuery = {
      sort: '-createdAt',
      limit: pageSize,
      populate: 'conversationId',
    };

    if (this.props.campaignId) {
      apiQuery.query = `{"campaignId":"${this.props.campaignId}"}`;
    } else if (this.props.conversationId) {
      apiQuery.query = `{"conversationId":"${this.props.conversationId}"}`;
    } else if (this.props.requestId) {
      apiQuery.query = `{"metadata.requestId":"${this.props.requestId}"}`;
    } else if (this.props.broadcastId) {
      let query;
      if (this.props.macro === 'other') {
        query = `{"broadcastId":"${this.props.broadcastId}","direction":"inbound","macro":{"$nin":["confirmedCampaign","declinedCampaign","subscriptionStatusStop"]}}`;
      } else {
        query = `{"broadcastId":"${this.props.broadcastId}","direction":"inbound","macro":"${this.props.macro}"}`;
      }
      apiQuery.query = query;
    }

    // Check for skip query string parameter.
    const clientQuery = queryString.parse(window.location.search);
    this.skipCount = Number(clientQuery.skip);
    if (this.skipCount) {
      apiQuery.skip = this.skipCount;
    } else {
      this.skipCount = 0;
    }

    this.requestQuery = apiQuery;
    this.requestPath = helpers.getMessagesPath();
  }

  render() {
    return (
      <HttpRequest path={this.requestPath} query={this.requestQuery}>
        {
          (res) => {
            let total = 0;
            if (res.pagination && res.pagination.total) {
              total = res.pagination.total;
            }
            return (
              <MessageList
                totalCount={total}
                data={res.data}
                skipCount={this.skipCount}
                pageSize={pageSize}
                table={this.props.table}
              />
            );
          }
        }
      </HttpRequest>
    );
  }
}

MessageListContainer.propTypes = {
  broadcastId: PropTypes.string,
  campaignId: PropTypes.string,
  conversationId: PropTypes.string,
  macro: PropTypes.string,
  requestId: PropTypes.string,
  table: PropTypes.bool,
};

MessageListContainer.defaultProps = {
  broadcastId: null,
  campaignId: null,
  conversationId: null,
  macro: null,
  requestId: null,
  table: false,
};

export default MessageListContainer;
