import React from 'react';
import { Col, Glyphicon, Grid, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      {res => (
        <div>
          <p>
            <Link to="?cache=false">
              <Glyphicon glyph="refresh" /> Refresh
            </Link>
          </p>
          <Table striped><tbody>
            <tr><th>
              <Row key="header">
                <Col md={3}>Trigger</Col>
                <Col md={9}>Reply</Col>
              </Row>
            </th></tr>
            {lodash.orderBy(res.data.topics.random, 'trigger')
              .map(trigger => (<TriggerListItem key={trigger.trigger} trigger={trigger} />))}
          </tbody></Table>
        </div>
      )}
    </HttpRequest>
  </Grid>
);

export default TriggerListContainer;
