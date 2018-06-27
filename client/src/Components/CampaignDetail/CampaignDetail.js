import React from 'react';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  return (
    <Panel>
      <Panel.Body>
        <p>
          <strong>Tagline:</strong> {campaign.tagline}
        </p>
        <p>
          <strong>Status:</strong> {campaign.status}
        </p>
      </Panel.Body>
    </Panel>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.shape.isRequired,
};

export default CampaignDetail;
