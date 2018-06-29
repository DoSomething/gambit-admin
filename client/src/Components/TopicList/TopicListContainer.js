import React from 'react';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TopicListItem from './TopicListItem';

const lodash = require('lodash');
const helpers = require('../../helpers');

function renderTopics(topics) {
  const rows = topics.map(topic => <TopicListItem key={topic.id} topic={topic} />);
  const header =  (
    <tr><th>
      <Row>
        <Col md={1}>Campaign</Col>
        <Col md={1}>Post</Col>
        <Col md={6}>Topic</Col>
        <Col md={4}>Triggers</Col>
      </Row>
    </th></tr>
  );
  return <Table><tbody>{header}{rows}</tbody></Table>;
}

export default class TopicListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.requestPath = helpers.getTopicsPath();
  }
  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath}>
          {(topics) => {
            const topicsByStatus = lodash.groupBy(topics, (topic) => {
              if (topic.triggers.length && topic.campaign.status === 'active') {
                return 'active';
              }
              return 'inactive';
            });
            return (
              <div>
                <h3>Current</h3>
                <p>If a user conversation changes to one of the following topics, a signup is created for the topic campaign and they are prompted to create the respective type of campaign post.</p>
                {renderTopics(topicsByStatus.active)}
                <h3>Archived</h3>
                <p>These topics either do not have any triggers, or reference a campaigns that has ended.</p>
                {renderTopics(topicsByStatus.inactive)}
              </div>
            );
          }}
        </HttpRequest>
      </Grid>
    );
  }
}
