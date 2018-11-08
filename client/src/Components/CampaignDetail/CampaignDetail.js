import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import TopicList from '../TopicList/TopicListContainer';
import CampaignTriggers from './CampaignTriggers';
import helpers from '../../helpers';

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
      <HttpRequest path={helpers.getDefaultTopicTriggersPath()}>
        {triggers => (<CampaignTriggers triggers={triggers} campaignId={campaign.id} />)}
      </HttpRequest>
      <TopicList campaign={campaign} />
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignDetail;
