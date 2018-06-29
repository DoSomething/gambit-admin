import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastListItem from './BroadcastListItem';

const helpers = require('../../helpers');

export default class BroadcastListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.requestPath = helpers.getBroadcastsPath();
  }

  render() {
    return (
      <Grid>
        <PageHeader>Broadcasts</PageHeader>
        <HttpRequest path={this.requestPath}>
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
}
