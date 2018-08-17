import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const BroadcastListItem = (props) => {
  const broadcast = props.broadcast;
  const broadcastId = broadcast.id;
  const campaignId = broadcast.campaignId;
  let context = broadcast.type;
  // Parse legacy broadcast type:
  if (broadcast.topic) {
    context = broadcast.topic;
  } else if (broadcast.campaignId) {
    const url = `/campaigns/${campaignId}`;
    context = <span>{broadcast.message.template} campaign <Link to={url}>{campaignId}</Link></span>;
  }

  return (
    <Row componentClass="tr" key={broadcastId}>
      <Col componentClass="td" md={5}>
        <Link to={`broadcasts/${broadcastId}`}>{broadcast.name}</Link>
        <p><small>{context}</small></p>
      </Col>
      <Col componentClass="td" md={7}>
        {broadcast.message.text}
      </Col>
    </Row>
  );
};

BroadcastListItem.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastListItem;
