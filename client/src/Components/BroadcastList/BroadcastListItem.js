import React from 'react';
import { Col, Row } from 'react-bootstrap';
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
    <Row componentClass="tr" key={broadcastId}>
      <Col componentClass="td" md={5}>
        <Link to={`broadcasts/${broadcastId}`}>{broadcast.name}</Link>
        <p>{context}</p>
      </Col>
      <Col componentClass="td" md={7}>
        {!!(broadcast.message) ? broadcast.message.text : null}
      </Col>
    </Row>
  );
};

BroadcastListItem.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastListItem;
