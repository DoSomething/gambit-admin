import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TriggerListItem from './TriggerListItem';

const lodash = require('lodash');
const helpers = require('../../helpers');

function renderList(triggers) {
  return (
    <Table striped><tbody>
      <tr><th>
        <Row key="header">
          <Col md={3}>Trigger</Col>
          <Col md={9}>Response</Col>
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
            <h2>Campaigns</h2>
            {renderList(triggersByType.topic)}
            <h2>General</h2>
            {renderList(triggersByType.random)}
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);

export default TriggerListContainer;
