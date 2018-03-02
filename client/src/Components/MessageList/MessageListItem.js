import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import Moment from 'react-moment';

const config = require('../../config');

function renderDate(message) {
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

function renderContent(message) {
  let messageText = message.text;
  const isInbound = (message.direction === 'inbound');
  if (isInbound) {
    messageText = <strong>{ messageText }</strong>;
  }
  let broadcastGroupItem = null;
  const broadcastId = message.broadcastId;
  if (broadcastId) {
    const broadcastUri = `/broadcasts/${broadcastId}`;
    broadcastGroupItem = (
      <ListGroupItem>
        <small>Broadcast: <Link to={broadcastUri}><code>{ broadcastId }</code></Link></small>
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
  let macroGroupItem;
  if (isInbound && message.match) {
    matchGroupItem = (
      <ListGroupItem>
        <small>Match: <code>{ message.match }</code></small>
      </ListGroupItem>
    );
    if (message.macro) {
      macroGroupItem = (
        <ListGroupItem>
          <small>Macro: <code>{ message.macro }</code></small>
        </ListGroupItem>
      );
    }
  }
  let templateGroupItem;
  if (message.template) {
    templateGroupItem = (
      <ListGroupItem>
        <small>Template: { message.template }</small>
      </ListGroupItem>
    );
  }
  let messageContext;
  if (message.topic === 'campaign') {
    const campaignId = message.campaignId;
    const campaignUrl = `/campaigns/${campaignId}`;
    messageContext = <small>Campaign: <Link to={campaignUrl}>{campaignId}</Link></small>;
  } else {
    messageContext = <small>Topic: {message.topic}</small>;
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
      <ListGroupItem>{ messageText }</ListGroupItem>
      <ListGroupItem>{ messageContext }</ListGroupItem>
      { broadcastGroupItem }
      { agentGroupItem }
      { matchGroupItem }
      { macroGroupItem }
      { templateGroupItem }
      { retryGroupItem }
    </ListGroup>
  );
}


const MessageListItem = (props) => {
  const message = props.message;
  if (!message.conversationId) {
    return null;
  }
  const uri = `/conversations/${message.conversationId._id}`;
  const userLink = <Link to={uri}>{message.conversationId._id}</Link>;
  const isInbound = message.direction === 'inbound';
  const offset = isInbound ? 0 : 1;

  if (props.table) {
    return (
      <tr key={message._id}>
        <td width="15%"><small>{renderDate(message)}</small></td>
        <td width="15%">{userLink}</td>
        <td>{message.text}</td>
      </tr>
    );
  }

  return (
    <Row key={message._id}>
      <Col md={2} mdOffset={2}>
        <div><small><strong>{userLink}</strong></small></div>
        <small>{ renderDate(message) }</small>
      </Col>
      <Col md={4} mdOffset={offset}>{ renderContent(message) }</Col>
    </Row>
  );
};

MessageListItem.propTypes = {
  message: PropTypes.shape.isRequired,
  table: PropTypes.bool.isRequired,
};

export default MessageListItem;
