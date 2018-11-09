import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicList from '../TopicList/TopicListContainer';
import TriggerList from '../TriggerList/TriggerListContainer';

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
      <h2>Keywords</h2>
      <TriggerList campaignId={campaign.id} />
      <h2>All topics</h2>
      <TopicList campaign={campaign} />
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignDetail;
