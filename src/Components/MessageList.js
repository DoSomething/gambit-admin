import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Table, ListGroup, ListGroupItem, Image} from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const config = require('../config');
const gambit = require('../gambit');

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = gambit.conversationsUrl('messages?sort=-createdAt&limit=50&populate=conversationId');
    if (this.props.conversationId) {
       const query = encodeURIComponent(`"conversationId":"${this.props.conversationId}"`);
       this.requestUrl = `${this.requestUrl}&query={${query}}`;
    } else if (this.props.requestId) {
      const query = encodeURIComponent(`"metadata.requestId":"${this.props.requestId}"`);
      this.requestUrl = `${this.requestUrl}&query={${query}}`;
    }
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
              return (
                <Table striped bordered>
                  <tbody>
                    { this.renderHeader() }
                    { result.body.map(message => this.renderMessageRow(message)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    );
  }

  renderDate(message) {
    const uri = `/requests/${message.metadata.requestId}`;
    const dateFormat = config.dateFormat;
    return (
      <Link to={uri}>
        <Moment format={dateFormat}>{ message.createdAt }</Moment>
      </Link>
    );
  }

  renderHeader() {
    let userCell;
    if (! this.props.conversationId) {
      userCell = <th>Platform User ID</th>;
    }

    return (
      <tr>
        <th>Date</th>
        { userCell }
        <th>Direction</th>
        <th>Message</th>
        <th>Topic</th>
        <th>Campaign</th>
        <th>Template</th>
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
    let retryGroupItem;
    if (message.metadata.retryCount) {
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
        <td>
          <small>{ message.template }</small>
        </td>
      </tr>
    );
  }
}
