import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const config = require('../../config');
const helpers = require('../../helpers');

const UserListItem = (props) => {
  const conversation = props.conversation;
  const identifier = helpers.getUserIdentifierForConversation(conversation);
  let platformLabel = '';
  let uri = `/users/${conversation.userId}`;
  const platform = conversation.platform;
  if (platform !== 'sms') {
    platformLabel = <Label>{platform}</Label>;
    uri = `${uri}?platform=${platform}`;
  }
  return (
    <tr key={conversation._id}>
      <td><Moment format={config.dateFormat}>{conversation.updatedAt}</Moment></td>
      <td><Link to={uri}>{identifier}</Link> {platformLabel}</td>
      <td>{conversation.campaignId}</td>
      <td>{conversation.topic}</td>
    </tr>
  );
};

UserListItem.propTypes = {
  conversation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserListItem;
