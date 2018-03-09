import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const config = require('../../config');
const helpers = require('../../helpers');

const ConversationListItem = (props) => {
  const conversation = props.conversation;
  const identifier = helpers.getUserIdentifierForConversation(conversation);
  let platformLabel = '';
  if (conversation.platform !== 'sms') {
    platformLabel = <Label>{conversation.platform}</Label>;
  }
  return (
    <tr key={conversation._id}>
      <td><Moment format={config.dateFormat}>{conversation.updatedAt}</Moment></td>
      <td><Link to={`/conversations/${conversation._id}`}>{identifier}</Link> {platformLabel}</td>
      <td>{conversation.campaignId}</td>
      <td>{conversation.topic}</td>
    </tr>
  );
};

ConversationListItem.propTypes = {
  conversation: PropTypes.shape.isRequired,
};

export default ConversationListItem;
