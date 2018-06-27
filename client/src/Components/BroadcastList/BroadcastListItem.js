import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

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
        <h4>
          <Link to={`broadcasts/${broadcastId}`}>{helpers.broadcastName(broadcast)}</Link>
        </h4>
        <small><Moment format="MM/DD/YYYY">{broadcast.createdAt}</Moment></small>
        <p>{context}</p>
        <p>{broadcast.message}</p>
      </td>
    </tr>
  );
};

BroadcastListItem.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastListItem;
