import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastListItem from './BroadcastListItem';

const helpers = require('../../helpers');

export default class BroadcastListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = helpers.getBroadcastsUrl();
  }

  render() {
    return (
      <Grid>
        <PageHeader>Broadcasts</PageHeader>
        <HttpRequest url={this.requestUrl}>
          {
            res => (
              <Table striped hover>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Context</th>
                    <th>Message</th>
                  </tr>
                  {res.data.map(broadcast => <BroadcastListItem broadcast={broadcast} />)}
                </tbody>
              </Table>
            )
          }
        </HttpRequest>
      </Grid>
    );
  }
}
