import React from 'react';
import { PageHeader, Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicListItem from '../TopicList/TopicListItem';
import HttpRequest from '../HttpRequest';

const helpers = require('../../helpers');

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
      <h2>Topics</h2>
      {campaign.topics.map(topic => (
        <TopicListItem
          key={topic.id}
          topic={topic}
        />
      ))}
      <HttpRequest path={helpers.getTopicsPath()}>
        {(data) => {
          const inactiveTopicsForThisCampaign = data.filter((topic) => {
            return topic.campaign.id === campaign.id && topic.triggers.length === 0;
          });
          return inactiveTopicsForThisCampaign.map(topic => (
            <TopicListItem key={topic.id} topic={topic} />
          ));
        }}
      </HttpRequest>
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignDetail;
