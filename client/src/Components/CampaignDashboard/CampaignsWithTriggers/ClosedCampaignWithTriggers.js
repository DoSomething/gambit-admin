import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CampaignLink from '../../CampaignLink';

const ClosedCampaignWithTriggers = (props) => {
  const campaign = props.campaign;
  return (
    <Row componentClass="tr">
      <Col componentClass="td" md={4}>
        <CampaignLink campaign={campaign} linkDisabled />
      </Col>
      <Col componentClass="td" md={8}>
        {campaign.triggers.map(item => item.trigger).join(', ')}
      </Col>
    </Row>
  );
};

ClosedCampaignWithTriggers.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ClosedCampaignWithTriggers;
