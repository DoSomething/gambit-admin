import React from 'react';
import { PageHeader, Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicListItem from '../TopicList/TopicListItem';

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
      <h3>Active topics</h3>
      <Table striped hover>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Triggers</th>
            <th>Post type</th>
          </tr>
          {campaign.topics.map(topic => (
            <TopicListItem
              key={topic.id}
              topic={topic}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.shape.isRequired,
};

export default CampaignDetail;
