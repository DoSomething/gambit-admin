import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BroadcastListItem = (props) => (
  <Row componentClass="tr" key={props.broadcast.id}>
    <Col componentClass="td" md={5}>
      <Link to={`broadcasts/${props.broadcast.id}`}>{props.broadcast.name}</Link>
      <p><small>{props.broadcast.type}</small></p>
    </Col>
    <Col componentClass="td" md={7}>
      {props.broadcast.text}
    </Col>
  </Row>
);

BroadcastListItem.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastListItem;
