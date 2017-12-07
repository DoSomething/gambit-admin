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
    }

    // Check for skip query string parameter.
    const clientQuery = queryString.parse(window.location.search);
    this.skipCount = Number(clientQuery.skip);
    if (this.skipCount) {
      apiQuery.skip = this.skipCount;
    } else {
      this.skipCount = 0;
    }

    this.requestUrl = helpers.getMessagesUrl(apiQuery);
  }

  render() {
    return (
      <HttpRequest url={this.requestUrl}>
        {
          res => (
            <MessageList
              totalCount={res.pagination.total}
              data={res.data}
              skipCount={this.skipCount}
              pageSize={pageSize}
            />
          )
        }
      </HttpRequest>
    );
  }
}

MessageListContainer.propTypes = {
  campaignId: PropTypes.string,
  conversationId: PropTypes.string,
  requestId: PropTypes.string,
};

MessageListContainer.defaultProps = {
  campaignId: null,
  conversationId: null,
  requestId: null,
};

export default MessageListContainer;
