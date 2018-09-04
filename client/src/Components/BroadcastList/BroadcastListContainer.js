import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastListItem from './BroadcastListItem';

const helpers = require('../../helpers');

const BroadcastListContainer = () => (
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

export default BroadcastListContainer;
