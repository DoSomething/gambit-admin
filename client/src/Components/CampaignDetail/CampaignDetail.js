import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicList from '../TopicList/TopicListContainer';

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  return (
    <div>
      <PageHeader>{campaign.title}</PageHeader>
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
      <TopicList campaign={campaign} />
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignDetail;
