import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import TopicListItem from './TopicListItem';

const lodash = require('lodash');
const helpers = require('../../helpers');

function renderTopics(topics, displayCampaign) {
  if (!topics || !topics.length) {
    return <p>No topics found</p>;
  }
  let campaignCell = null;
  if (displayCampaign) {
    campaignCell = <Col md={1}>Campaign</Col>;
  }

  const rows = topics.map(topic => (
    <TopicListItem key={topic.id} topic={topic} displayCampaign={displayCampaign} />
  ));
  const header = (
    <tr><th>
      <Row>
        {campaignCell}
        <Col md={1}>Post</Col>
        <Col md={6}>Topic</Col>
        <Col md={4}>Triggers</Col>
      </Row>
    </th></tr>
  );
  return <Table><tbody>{header}{rows}</tbody></Table>;
}

const TopicListContainer = props => (
  <Grid>
    <HttpRequest path={helpers.getTopicsPath()}>
      {(res) => {
        let topics = res;
        let displayCampaign = true;
        const campaign = props.campaign;
        if (campaign) {
          displayCampaign = false;
          topics = topics.filter(topic => topic.campaign && topic.campaign.id === campaign.id);
        }
        const topicsByStatus = lodash.groupBy(topics, (topic) => {
          if (topic.triggers && topic.triggers.length && topic.campaign.status === 'active') {
            return 'current';
          }
          return 'inactive';
        });
        return (
          <div>
            <h2>Topics</h2>
            <h3>Current</h3>
            {renderTopics(topicsByStatus.current, displayCampaign)}
            <h3>Inactive</h3>
            {renderTopics(topicsByStatus.inactive, displayCampaign)}
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);

TopicListContainer.propTypes = {
  campaign: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
TopicListContainer.defaultProps = {
  campaign: null,
};

export default TopicListContainer;

