import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import MessageListDateItem from './MessageListDateItem';

const helpers = require('../../helpers');

function renderContent(message) {
  const deliveryMetadata = helpers.message.getDeliveryMetadata(message);

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
        { attachments.map(item => <Image src={item.url} key={item.url} height={200} />) }
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

  // TODO: Add all hardcoded topics and set via config.
  const hardcodedTopics = ['random', 'support', 'survey_response', 'support'];
  let topicValue = message.topic;
  if (!hardcodedTopics.includes(message.topic)) {
    const topicUri = `/topics/${topicValue}`;
    topicValue = <Link to={topicUri}><code>{topicValue}</code></Link>;
  }
  const topicGroupItem = (
    <ListGroupItem>
      <small>Topic: { topicValue }</small>
    </ListGroupItem>
  );

  let retryGroupItem;
  if (message.metadata && message.metadata.retryCount) {
    retryGroupItem = (
      <ListGroupItem>
        <small>Retry Count: { message.metadata.retryCount }</small>
      </ListGroupItem>
    );
  }

  let segmentsGroupItem;
  if (deliveryMetadata) {
    const totalSegmentsItem = (
      <div>
        <small>Total segments: { deliveryMetadata.totalSegments }</small>
      </div>
    );
    segmentsGroupItem = (
      <ListGroupItem>
        { totalSegmentsItem }
      </ListGroupItem>
    );
  }

  return (
    <ListGroup>
      { attachmentGroupItem }
      <ListGroupItem>{ messageText }</ListGroupItem>
      { topicGroupItem }
      { broadcastGroupItem }
      { agentGroupItem }
      { matchGroupItem }
      { macroGroupItem }
      { templateGroupItem }
      { retryGroupItem }
      { segmentsGroupItem }
    </ListGroup>
  );
}


const MessageListItem = (props) => {
  const message = props.message;
  if (!message.conversationId) {
    return null;
  }
  const identifier = helpers.getUserIdentifierForConversation(message.conversationId);
  let uri = `/users/${identifier}`;
  const platform = message.conversationId.platform;
  if (platform !== 'sms') {
    uri = `${uri}?platform=${platform}`;
  }
  const userLink = <Link to={uri}>{identifier}</Link>;
  const isInbound = helpers.message.isInbound(message);
  const offset = isInbound ? 0 : 1;

  if (props.table) {
    return (
      <tr key={message._id}>
        <td width="15%">
          <small><MessageListDateItem message={message} isInbound={isInbound} /></small>
        </td>
        <td width="15%">{userLink}</td>
        <td>{message.text}</td>
      </tr>
    );
  }

  return (
    <Row key={message._id}>
      <Col md={3} mdOffset={2}>
        <div><small><strong>{userLink}</strong></small></div>
        <small><MessageListDateItem message={message} isInbound={isInbound} /></small>
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
