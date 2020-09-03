import React from 'react';
import { Button, ButtonToolbar, Col, Glyphicon, Grid, Panel, Row, Table } from 'react-bootstrap';
import lodash from 'lodash';
import queryString from 'query-string';

import HttpRequest from '../HttpRequest';
import helpers from '../../helpers';

const AdminDashboard = () => (
  <Grid>
    <HttpRequest
      path={helpers.getRivescriptPath()}
      query={queryString.parse(window.location.search)}
    >
      {(res) => {
        const rows = lodash.orderBy(res.data.topics.random, 'trigger')
          .map((trigger) => {
            const desc = trigger.reply.length ? trigger.reply : `@ ${trigger.redirect}`;
            return (
              <Row componentClass="tr" key={trigger.trigger}>
                <Col componentClass="td"><strong>{trigger.trigger}</strong></Col>
                <Col componentClass="td">{desc}</Col>
              </Row>
            );
          });

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
              <Row componentClass="tr" key="header">
                <Col componentClass="td" md={3}><strong>Trigger</strong></Col>
                <Col componentClass="td" md={9}><strong>Reply</strong></Col>
              </Row>
              {rows}
            </tbody></Table>
          </div>
        );
      }}
    </HttpRequest>
  </Grid>
);


export default AdminDashboard;
