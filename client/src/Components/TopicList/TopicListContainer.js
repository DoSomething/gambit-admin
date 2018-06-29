import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import HttpRequest from '../HttpRequest';
import TopicListItem from './TopicListItem';
import helpers from '../../helpers';

function renderTopics(topics, displayCampaign) {
  if (!topics || !topics.length) {
    return <p>No topics found</p>;
  }
  const campaignCell = displayCampaign ? <Col md={1} componentClass="th">Campaign</Col> : null;
  const rows = topics.map(topic => (
    <TopicListItem key={topic.id} topic={topic} displayCampaign={displayCampaign} />
  ));
  const header = (
    <Row componentClass="tr">
      {campaignCell}
      <Col componentClass="th" md={1}>Posts</Col>
      <Col componentClass="th" md={6}>Topic</Col>
      <Col componentClass="th" md={4}>Triggers</Col>
    </Row>
  );
  return <Table><tbody>{header}{rows}</tbody></Table>;
}

const TopicListContainer = props => (
  <Grid>
    <HttpRequest path={helpers.getTopicsPath()}>
      {(res) => {
        const campaign = props.campaign;
        const displayCampaign = !campaign;
        const topics = displayCampaign ? res : res
          .filter(topic => topic.campaign && topic.campaign.id === campaign.id);
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
