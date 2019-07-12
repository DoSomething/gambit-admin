import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicLink from './TopicLink';
import CampaignLink from './CampaignLink';

const WebSignupConfirmation = ({ displayCampaign, webSignupConfirmation })  => (
  <Row componentClass="tr">
    <Col componentClass="td" md={3}>
      {displayCampaign
        ? <strong><CampaignLink campaign={webSignupConfirmation.campaign} /></strong>
        : null}
    </Col>
    <Col componentClass="td" md={5}>{webSignupConfirmation.topic ? webSignupConfirmation.topic.text : ''}</Col>
    <Col componentClass="td" md={4}>
      <TopicLink topic={webSignupConfirmation.topic ? webSignupConfirmation.topic.topic : {}} />
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
