import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import lodash from 'lodash';
import HttpRequest from '../HttpRequest';
import TriggerListItem from './TriggerListItem';
import helpers from '../../helpers';

const TriggerListContainer = () => (
  <Grid>
    <HttpRequest path={helpers.getRivescriptPath()}>
      {res => (
        <Table striped><tbody>
          <tr><th>
            <Row key="header">
              <Col md={3}>Trigger</Col>
              <Col md={9}>Reply</Col>
            </Row>
          </th></tr>
          {lodash.orderBy(res.data.topics.random, 'trigger')
            .map(trigger => (<TriggerListItem trigger={trigger} />))}
        </tbody></Table>
      )}
    </HttpRequest>
  </Grid>
);

export default TriggerListContainer;
