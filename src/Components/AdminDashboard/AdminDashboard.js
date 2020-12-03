import React from 'react';
import lodash from 'lodash';
import queryString from 'query-string';
import { Button, ButtonToolbar, Col, Glyphicon, Grid, Panel, Row, Table } from 'react-bootstrap';

import helpers from '../../helpers';
import HttpRequest from '../HttpRequest';
import TriggerDetail from '../TriggerDetail';

const AdminDashboard = () => (
  <Grid>
    <HttpRequest
      path={helpers.getRivescriptPath()}
      query={queryString.parse(window.location.search)}
    >
      {(res) => {
        let triggersTotal = 0;

        const parsedTopics = Object.keys(res.data.topics).map(topicName => {
          const topicTriggers = res.data.topics[topicName];
          triggersTotal += topicTriggers.length;

          return ({ 
            topicName,
            triggers: lodash.orderBy(topicTriggers, 'trigger')
              .map(trigger => <TriggerDetail trigger={trigger} />)
          });
        });

        return (
          <div>
            <Panel>
              <Panel.Body>
                <p>Found <strong>{triggersTotal}</strong> triggers loaded.</p>

                <ButtonToolbar>
                  <Button type="reset" href="?cache=false" bsSize="small">
                    <Glyphicon glyph="refresh" />
                  </Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Heading>
                <Panel.Title>Random</Panel.Title>
              </Panel.Heading>

              <Panel.Body>
                <Table striped><tbody>
                  <Row componentClass="tr" key="header">
                    <Col componentClass="td" md={3}><strong>Trigger</strong></Col>

                    <Col componentClass="td" md={9}><strong>Reply</strong></Col>
                  </Row>

                  {parsedTopics.find(topic => topic.topicName === 'random').triggers}
                </tbody></Table>
              </Panel.Body>
            </Panel>

            { parsedTopics.filter(topic => topic.topicName !== 'random').map(topic => (
              <Panel key={topic.topicName}>
                <Panel.Heading>
                  <Panel.Title toggle>{topic.topicName}</Panel.Title>
                </Panel.Heading>

                <Panel.Collapse>
                  <Panel.Body>            
                    <Table striped><tbody>
                      <Row componentClass="tr" key="header">
                        <Col componentClass="td" md={3}><strong>Trigger</strong></Col>

                        <Col componentClass="td" md={9}><strong>Reply</strong></Col>
                      </Row>

                      {topic.triggers}
                    </tbody></Table>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            )) }
            
            <Panel>
              <Panel.Body>
                <a href="https://github.com/DoSomething/gambit/blob/944a764fa40170547b97ebf5dd1edd9d0d19a637/config/lib/bad-words.js">Bad Words List</a>      
              </Panel.Body>
            </Panel>
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);


export default AdminDashboard;
