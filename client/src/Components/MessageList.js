import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, ListGroup, ListGroupItem, Image, Pager} from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const queryString = require('query-string');
const config = require('../config');
const helpers = require('../helpers');

const pageSize = config.resultsPageSize; 

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    const path = `messages?sort=-createdAt&limit=${pageSize}&populate=conversationId`;
    this.requestUrl = helpers.apiUrl(path);

    if (this.props.campaignId) {
       const query = encodeURIComponent(`"campaignId":"${this.props.campaignId}"`);
       this.requestUrl = `${this.requestUrl}&query={${query}}`;
    } else if (this.props.conversationId) {
       const query = encodeURIComponent(`"conversationId":"${this.props.conversationId}"`);
       this.requestUrl = `${this.requestUrl}&query={${query}}`;
    } else if (this.props.requestId) {
      const query = encodeURIComponent(`"metadata.requestId":"${this.props.requestId}"`);
      this.requestUrl = `${this.requestUrl}&query={${query}}`;
    }

    const query = queryString.parse(window.location.search);
    this.skipCount = Number(query.skip);
    if (this.skipCount) {
      this.requestUrl =`${this.requestUrl}&skip=${this.skipCount}`;
    } else {
      this.skipCount = 0;
    }
  }

  renderTablePager(result) {
    const totalResultCount = result.header['x-gambit-results-count'];
    const pageCount = result.body.length;
    const startNumber = this.skipCount + 1;
    const endNumber = startNumber + pageCount - 1;

    const location = window.location;
    const url = [location.protocol, '//', location.host, location.pathname].join('');

    let leftPagerItem;
    if (this.skipCount) {
      const prevSkip = this.skipCount - pageSize;
      let prevUrl = url;
      if (prevSkip > 0) {
        prevUrl = `${url}?skip=${prevSkip}`;
      }
      leftPagerItem = <Pager.Item previous href={ prevUrl }>Previous</Pager.Item>;
    }

    let rightPagerItem;
    if (totalResultCount > pageSize && endNumber < totalResultCount) {
      const nextUrl = `${url}?skip=${this.skipCount + pageSize}`;
      rightPagerItem = <Pager.Item next href={ nextUrl }>Next</Pager.Item>;
    }
    const label = <small>{ startNumber }-{ endNumber } of { totalResultCount }</small>;
    return (
      <Pager>
        {leftPagerItem}
        {label}
        {rightPagerItem}
      </Pager>
    );
  }

  render() {
    return (
      <Request
        url={ this.requestUrl }
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <RequestLoading />;
            } else if (error) {
              return <RequestError error={error} />
            } else {
              const pager = this.renderTablePager(result);
              return (
                <div>
                { pager }
                <Grid>
                { result.body.map(message => this.renderMessageRow(message)) }
                </Grid>
                { pager }
                </div>
              );
            }
          }
        }
      </Request>
    );
  }

  renderDate(message) {
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

  renderMessageContent(message) {
    let text = message.text;
    if (message.direction === 'inbound') {
      text = <strong>{ text }</strong>;
    }
    let broadcastGroupItem = null;
    let broadcastId = message.broadcastId;
    if (broadcastId) {
      broadcastGroupItem = (
        <ListGroupItem>
          <small>Broadcast: { broadcastId }</small>
        </ListGroupItem>
      );
    }
    let attachments = message.attachments;
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
          <small>Agent: { message.agentId }</small>
        </ListGroupItem>
      );
    }
    let matchGroupItem;
    if (message.match) {
      matchGroupItem = (
        <ListGroupItem>
          <small>Match: { message.match }</small>
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

  renderMessageRow(message) {
    const uri = `/conversations/${message.conversationId._id}`;
    const userLink = <Link to={uri}>{ message.conversationId.platformUserId }</Link>;
    const isInbound = message.direction === 'inbound';
    const offset = isInbound ? 0 : 1;

    return (
      <Row key={ message._id }>
        <Col md={2} mdOffset={2}>
          <div>{ isInbound ? 'From' : 'To' } <strong>{userLink}</strong></div>
          <small>{ this.renderDate(message) }</small>
        </Col>
        <Col md={4} mdOffset={offset}>{ this.renderMessageContent(message) }</Col>
      </Row>
    );
  }
}
