import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignLink from '../../CampaignLink';
import helpers from '../../../helpers';


const ClosedCampaignWithTriggers = (props) => {
  const campaign = props.campaign;
  return (
    <Row componentClass="tr">
      <Col componentClass="td" md={4}>
        <CampaignLink campaign={campaign} />
      </Col>
      <Col componentClass="td" md={8}>
        <ul>
          {campaign.triggers.map(item => (
            <li key={item.id}>
              <a href={helpers.getContentfulUrlForEntryId(item.id)}>{item.trigger}</a>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

ClosedCampaignWithTriggers.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ClosedCampaignWithTriggers;
