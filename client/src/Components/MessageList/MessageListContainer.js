import React from 'react';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import MessageListItem from './MessageListItem';

const helpers = require('../../helpers');

class MessageListContainer extends React.Component {
  constructor(props) {
    super(props);

    const apiQuery = {
      sort: '-createdAt',
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

    this.requestQuery = apiQuery;
    this.requestPath = helpers.getMessagesPath();
  }

  render() {
    return (
      <HttpRequest path={this.requestPath} query={this.requestQuery} description="messages">
        {
          res => res.data.map(msg => <MessageListItem table={this.props.table} message={msg} />)
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
