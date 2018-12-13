import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignTopicList from './CampaignTopicList';
import TriggerList from '../TriggerList/TriggerListContainer';

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  return (
    <div>
      <PageHeader>{campaign.internalTitle}</PageHeader>
      <Panel>
        <Panel.Body>
          <p>
            <strong>Status:</strong> {campaign.status}
          </p>
        </Panel.Body>
      </Panel>
      <h2>Keywords</h2>
      <TriggerList campaignId={campaign.id} />
      <h2>All topics</h2>
      <h3>Auto reply</h3>
      <CampaignTopicList topicType="autoReply" campaign={campaign} />
      <h3>Photo post</h3>
      <CampaignTopicList topicType="photoPostConfig" campaign={campaign} />
      <h3>Text post</h3>
      <CampaignTopicList topicType="textPostConfig" campaign={campaign} />
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignDetail;
