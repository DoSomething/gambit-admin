import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const helpers = require('../../helpers');

const BroadcastListItem = (props) => {
  const broadcast = props.broadcast;
  const broadcastId = broadcast.id;
  const campaignId = broadcast.campaignId;
  let context = null;
  if (broadcast.topic) {
    context = <small>Topic: {broadcast.topic}</small>;
  } else {
    const url = `/campaigns/${campaignId}`;
    context = <small>Campaign: <Link to={url}>{campaignId}</Link></small>;
  }

  return (
    <tr key={broadcastId}>
      <td>
        <small>
          <Link to={`broadcasts/${broadcastId}`}>{helpers.broadcastName(broadcast)}</Link>
        </small>
      </td>
      <td>{context}</td>
      <td>{broadcast.message}</td>
    </tr>
  );
};

BroadcastListItem.propTypes = {
  broadcast: PropTypes.shape.isRequired,
};

export default BroadcastListItem;
