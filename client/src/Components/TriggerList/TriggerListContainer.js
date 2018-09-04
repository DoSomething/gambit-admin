import React from 'react';
import { Button, ButtonToolbar, Col, Glyphicon, Grid, Panel, Row, Table } from 'react-bootstrap';
import queryString from 'query-string';
import lodash from 'lodash';
import HttpRequest from '../HttpRequest';
import TriggerListItem from './TriggerListItem';
import helpers from '../../helpers';

const TriggerListContainer = () => (
  <Grid>
    <HttpRequest
      path={helpers.getRivescriptPath()}
      query={queryString.parse(window.location.search)}
    >
      {(res) => {
        const rows = lodash.orderBy(res.data.topics.random, 'trigger')
          .map(trigger => (<TriggerListItem key={trigger.trigger} trigger={trigger} />));
        return (
          <div>
            <Panel>
              <Panel.Body>
                <p>Found <strong>{rows.length}</strong> triggers loaded.</p>
                <ButtonToolbar>
                  <Button type="reset" href="?cache=false" bsSize="small">
                    <Glyphicon glyph="refresh" />
                  </Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
            <Table striped><tbody>
              <tr><th>
                <Row key="header">
                  <Col md={3}>Trigger</Col>
                  <Col md={9}>Reply</Col>
                </Row>
              </th></tr>
              {rows}
            </tbody></Table>
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);

export default TriggerListContainer;
