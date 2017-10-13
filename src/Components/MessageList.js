import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Table, ListGroup, ListGroupItem, Image, Pager} from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const queryString = require('query-string');
const config = require('../config');
const gambit = require('../gambit');

const pageSize = config.resultsPageSize; 

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    const path = `messages?sort=-createdAt&limit=${pageSize}&populate=conversationId`;
    this.requestUrl = gambit.conversationsUrl(path);
    if (this.props.conversationId) {
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
    console.log(url);

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
    if (totalResultCount > pageSize) {
      const nextUrl = `${url}?skip=${this.skipCount + pageSize}`;
      rightPagerItem = <Pager.Item next href={ nextUrl }>Next</Pager.Item>;
    }

    return (
      <Pager>
        {leftPagerItem}
        <small>Displaying { startNumber }-{ endNumber } of { totalResultCount } messages</small>
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
              const header = this.renderTablePager(result);
              return (
                <div>
                { header }
                <Table striped>
                  <tbody>
                    { this.renderHeader() }
                    { result.body.map(message => this.renderMessageRow(message)) }
                  </tbody>
                </Table>
                { header }
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

  renderHeader() {
    let userCell;
    if (! this.props.conversationId) {
      userCell = <th>User</th>;
    }

    return (
      <tr>
        <th>Date</th>
        { userCell }
        <th>Direction</th>
        <th>Message</th>
        <th>Topic</th>
        <th>Campaign</th>
      </tr>
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
    if (!text && !attachments.length) {
      return null;
    }
    let attachmentGroupItem = null;
    if (attachments.length) {
      attachmentGroupItem = (
        <ListGroupItem>
          { attachments.map(item => <Image src={item.url} />) }
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
        { broadcastGroupItem }
        { agentGroupItem }
        { matchGroupItem }
        { templateGroupItem }
        { retryGroupItem }
      </ListGroup>
    );
  }

  renderMessageRow(message) {
    let userCell;
    if (! this.props.conversationId) {
      const uri = `/conversations/${message.conversationId._id}`;
      userCell = <td><small><Link to={uri}>{ message.conversationId.platformUserId }</Link></small></td>;
    }

    return (
      <tr key={ message._id }>
        <td className='date'>
          <small>{ this.renderDate(message) }</small>
        </td>
        { userCell }
        <td>
          <small>{ message.direction }</small>
        </td>
        <td>{ this.renderMessageContent(message) }</td>
        <td>
          <small>{ message.topic }</small>
        </td>
        <td>{ message.campaignId }</td>
      </tr>
    );
  }
}
