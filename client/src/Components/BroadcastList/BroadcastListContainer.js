import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastListItem from './BroadcastListItem';

const helpers = require('../../helpers');

const header = (
  <Row componentClass="tr">
    <Col componentClass="th" md={5}>Broadcast</Col>
    <Col componentClass="th" md={7}>Text</Col>
  </Row>
);

const BroadcastListContainer = props => {
  return (
    <Grid>
      <HttpRequest path={helpers.getBroadcastsPath()} description="broadcasts">
        {
          res => (
            <Table>
              <tbody>
                {res.data.map(broadcast => (
                  <BroadcastListItem
                    key={broadcast.id}
                    broadcast={broadcast}
                  />
                ))}
              </tbody>
            </Table>
          )
        }
      </HttpRequest>
    </Grid>
  );
}

export default BroadcastListContainer;
