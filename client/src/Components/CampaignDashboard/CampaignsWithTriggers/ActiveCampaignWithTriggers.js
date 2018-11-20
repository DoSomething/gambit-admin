import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CampaignLink from '../../CampaignLink';
import TriggerListItem from '../../TriggerList/TriggerListItem';

const ActiveCampaignWithTriggers = (props) => {
  const campaign = props.campaign;
  return (
    <Row componentClass="tr">
      <Col componentClass="td" md={3}>
        <CampaignLink campaign={campaign} linkDisabled />
      </Col>
      <Col componentClass="td" md={9}>
        {campaign.triggers.map(item => <TriggerListItem trigger={item} key={item.trigger} />)}
      </Col>
    </Row>
  );
};

ActiveCampaignWithTriggers.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ActiveCampaignWithTriggers;
