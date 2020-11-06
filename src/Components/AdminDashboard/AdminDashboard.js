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
          .map((trigger) => (
              <Row componentClass="tr" key={trigger.trigger}>
                <Col componentClass="td">
                  {trigger.contentfulId ? (
                    <a href={helpers.getContentfulUrlForEntryId(trigger.contentfulId)}>
                      {trigger.trigger}
                    </a>
                    ) : (
                    <>
                      {trigger.trigger}
                    </>
                   )}
                </Col>
                <Col componentClass="td">
                  {!trigger.redirect ? trigger.reply : `@ ${trigger.redirect}`}
                </Col>
              </Row>
            )
          );

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
