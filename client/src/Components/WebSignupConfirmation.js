import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicLink from './TopicLink';

const WebSignupConfirmation = (props) => (
  <Row componentClass="tr">
    <Col componentClass="td" md={2}>
      {props.displayCampaign ? props.webSignupConfirmation.campaign.internalTitle : null}
    </Col>
    <Col componentClass="td" md={6}>{props.webSignupConfirmation.text}</Col>
    <Col componentClass="td" md={4}>
      <TopicLink topic={props.webSignupConfirmation.topic} />
    </Col>
  </Row>
);

WebSignupConfirmation.propTypes = {
  webSignupConfirmation: PropTypes.object.isRequired,
  displayCampaign: PropTypes.bool,
};

WebSignupConfirmation.defaultProps = {
  displayCampaign: false,
};

export default WebSignupConfirmation;
