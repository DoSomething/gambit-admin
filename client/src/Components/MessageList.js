import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Grid, Row, ListGroup, ListGroupItem, Image, Pager } from 'react-bootstrap';
import Moment from 'react-moment';
import HttpRequest from './HttpRequest';

const queryString = require('query-string');
const config = require('../config');
const helpers = require('../helpers');

const pageSize = config.resultsPageSize;

class MessageList extends React.Component {
  static renderDate(message) {
    const dateFormat = config.dateFormat;
    const createdAt = <Moment format={dateFormat}>{ message.createdAt }</Moment>;
    if (!message.metadata) {
      return createdAt;
    }
    const uri = `/requests/${message.metadata.requestId}`;
    return (
      <Link to={uri}>
        { createdAt }
      </Link>
    );
  }

  static renderMessageContent(message) {
    let text = message.text;
    if (message.direction === 'inbound') {
      text = <strong>{ text }</strong>;
    }
    let broadcastGroupItem = null;
    const broadcastId = message.broadcastId;
    if (broadcastId) {
      broadcastGroupItem = (
        <ListGroupItem>
          <small>Broadcast: <code>{ broadcastId }</code></small>
        </ListGroupItem>
      );
    }
    const attachments = message.attachments;
    let attachmentGroupItem = null;
    if (attachments.length) {
      attachmentGroupItem = (
        <ListGroupItem>
          { attachments.map(item => <Image src={item.url} height={200} />) }
        </ListGroupItem>
      );
    }
    let agentGroupItem = null;
    if (message.agentId) {
      agentGroupItem = (
        <ListGroupItem>
          <small>Agent: <code>{ message.agentId }</code></small>
        </ListGroupItem>
      );
    }
    let matchGroupItem;
    if (message.match) {
      matchGroupItem = (
        <ListGroupItem>
          <small>Match: <code>{ message.match }</code></small>
        </ListGroupItem>
      );
    }
    let templateGroupItem;
    if (message.template) {
      templateGroupItem = (
        <ListGroupItem>
          <small>Template: { message.template }</small>
        </ListGroupItem>
      );
    }
    let campaignGroupItem;
    if (message.campaignId) {
      const campaignId = message.campaignId;
      const campaignUrl = `/campaigns/${campaignId}`;
      campaignGroupItem = (
        <ListGroupItem>
          <small>Campaign: <Link to={campaignUrl}>{campaignId}</Link></small>
        </ListGroupItem>
      );
    }
    let topicGroupItem;
    if (message.topic) {
      topicGroupItem = (
        <ListGroupItem>
          <small>Topic: {message.topic}</small>
        </ListGroupItem>
      );
    }
    let retryGroupItem;
    if (message.metadata && message.metadata.retryCount) {
      retryGroupItem = (
        <ListGroupItem>
          <small>Retry Count: { message.metadata.retryCount }</small>
        </ListGroupItem>
      );
    }
    return (
      <ListGroup>
        { attachmentGroupItem }
        <ListGroupItem>{ text }</ListGroupItem>
        { campaignGroupItem }
        { broadcastGroupItem }
        { topicGroupItem }
        { agentGroupItem }
        { matchGroupItem }
        { templateGroupItem }
        { retryGroupItem }
      </ListGroup>
    );
  }

  static renderMessageRow(message) {
    const uri = `/conversations/${message.conversationId._id}`;
    const userLink = <Link to={uri}>{message.conversationId.platformUserId}</Link>;
    const isInbound = message.direction === 'inbound';
    const offset = isInbound ? 0 : 1;

    return (
      <Row key={message._id}>
        <Col md={2} mdOffset={2}>
          <div>{ isInbound ? 'From' : 'To' } <strong>{userLink}</strong></div>
          <small>{ MessageList.renderDate(message) }</small>
        </Col>
        <Col md={4} mdOffset={offset}>{ MessageList.renderMessageContent(message) }</Col>
      </Row>
    );
  }

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

  renderTablePager(totalResultCount, pageCount) {
    const startNumber = this.skipCount + 1;
    const endNumber = (startNumber + pageCount) - 1;

    const location = window.location;
    const url = [location.protocol, '//', location.host, location.pathname].join('');

    let leftPagerItem;
    if (this.skipCount) {
      const prevSkip = this.skipCount - pageSize;
      const prevUrl = `${url}?skip=${prevSkip}`;
      leftPagerItem = <Pager.Item previous href={prevUrl}>Previous</Pager.Item>;
    }

    let rightPagerItem;
    if (totalResultCount > pageSize && endNumber < totalResultCount) {
      const nextUrl = `${url}?skip=${this.skipCount + pageSize}`;
      rightPagerItem = <Pager.Item next href={nextUrl}>Next</Pager.Item>;
    }
    let label = 'No results';
    if (totalResultCount > 0) {
      label = `${startNumber}-${endNumber} of ${totalResultCount}`;
    }

    return (
      <Pager>
        {leftPagerItem}
        <small>{label}</small>
        {rightPagerItem}
      </Pager>
    );
  }

  render() {
    return (
      <HttpRequest url={this.requestUrl}>
        {
          (res) => {
            const totalCount = res.pagination.total;
            const pager = this.renderTablePager(totalCount, res.data.length);
            return (
              <div>
                { pager }
                <Grid>
                  { res.data.map(message => MessageList.renderMessageRow(message)) }
                </Grid>
                { totalCount > 10 ? pager : null }
              </div>
            );
          }
        }
      </HttpRequest>
    );
  }
}

MessageList.propTypes = {
  campaignId: PropTypes.string,
  conversationId: PropTypes.string,
  requestId: PropTypes.string,
};

MessageList.defaultProps = {
  campaignId: null,
  conversationId: null,
  requestId: null,
};

export default MessageList;
