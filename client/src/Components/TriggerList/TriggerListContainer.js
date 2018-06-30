import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TriggerListItem from './TriggerListItem';

const lodash = require('lodash');
const helpers = require('../../helpers');

function renderList(triggers, responseLabel = 'Reply') {
  return (
    <Table striped><tbody>
      <tr><th>
        <Row key="header">
          <Col md={3}>Trigger</Col>
          <Col md={9}>{responseLabel}</Col>
        </Row>
      </th></tr>
      {triggers.map(trigger => <TriggerListItem trigger={trigger} />)}
    </tbody></Table>
  );
}

const TriggerListContainer = () => (
  <Grid>
    <HttpRequest path={helpers.getDefaultTopicTriggersPath()}>
      {(triggers) => {
        const sortedByTrigger = lodash.sortBy(triggers, trigger => trigger.trigger);
        const triggersByType = lodash.groupBy(sortedByTrigger, (trigger) => {
          if (trigger.topicId) {
            return 'topic';
          }
          return 'random';
        });
        return (
          <div>
            <p>There are <strong>{triggers.length}</strong> triggers.</p>
            <h3>Campaigns</h3>
            <p>Count: <strong>{triggersByType.topic.length}</strong></p>
            {renderList(triggersByType.topic, 'Topic')}
            <h3>General</h3>
            <p>Count: <strong>{triggersByType.random.length}</strong></p>
            {renderList(triggersByType.random)}
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);

export default TriggerListContainer;
