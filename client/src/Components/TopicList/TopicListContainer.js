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
  const rows = topics.map(topic => (
    <TopicListItem key={topic.id} topic={topic} displayCampaign={displayCampaign} />
  ));
  const header = (
    <Row componentClass="tr">
      <Col componentClass="th" md={5}>Topic</Col>
      <Col componentClass="th" md={5}>{displayCampaign ? 'Campaign' : null}</Col>
      <Col componentClass="th" md={2}>Triggers</Col>
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
            <h3>Current topics</h3>
            {renderTopics(topicsByStatus.current, displayCampaign)}
            <h3>Inactive topics</h3>
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
