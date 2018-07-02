import React from 'react';
import { Col, Grid, Panel, Row, Table } from 'react-bootstrap';
import lodash from 'lodash';
import HttpRequest from '../HttpRequest';
import TriggerListItem from './TriggerListItem';
import helpers from '../../helpers';

const brainUrl = 'https://github.com/DoSomething/gambit-conversations/blob/master/brain';
const ctlUrl = 'https://www.crisistextline.org';
const standardsUrl = 'https://support.twilio.com/hc/en-us/articles/223182208-Industry-standards-for-U-S-short-code-HELP-and-STOP';

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
        /* eslint-disable max-len */
        return (
          <div>
            <Panel>
              <Panel.Body>
                <p>There are <strong>{triggers.length}</strong> triggers published in Contentful, used to change topic, or send a quick reply.</p>
                <p>They are loaded in addition to the <a href={brainUrl}>Rivescript hardcoded in Gambit</a>, which handles:</p>
                <ul>
                  <li>
                    <a href={standardsUrl}>Industry standard INFO requests</a> (e.g. INFO, HELP)
                  </li>
                  <li>Subscription update requests (e.g. JOIN, STOP, UNSUBSCRIBE, LESS)</li>
                  <li>Support requests (e.g. QUESTION)</li>
                  <li>Crisis messages (when we prompt to message <a href={ctlUrl}>CTL</a>)</li>
                </ul>
              </Panel.Body>
            </Panel>
            <h3>Campaign triggers</h3>
            <p>Count: <strong>{triggersByType.topic.length}</strong></p>
            {renderList(triggersByType.topic, 'Topic')}
            <h3>Quick replies</h3>
            <p>Count: <strong>{triggersByType.random.length}</strong></p>
            {renderList(triggersByType.random)}
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);
/* eslint-enable max-len */

export default TriggerListContainer;
