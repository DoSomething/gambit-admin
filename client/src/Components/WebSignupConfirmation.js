import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicLink from './TopicLink';

const webSignupConfirmation = (props) => (
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

webSignupConfirmation.propTypes = {
  webSignupConfirmation: PropTypes.object.isRequired,
  displayCampaign: PropTypes.bool,
};

webSignupConfirmation.defaultProps = {
  displayCampaign: false,
};

export default webSignupConfirmation;
