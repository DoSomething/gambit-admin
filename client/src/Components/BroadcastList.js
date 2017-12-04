import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from './HttpRequest';

const helpers = require('../helpers');

export default class BroadcastList extends React.Component {
  static renderRow(broadcast) {
    const broadcastId = broadcast.id;
    const campaignId = broadcast.campaignId;

    return (
      <tr key={broadcastId}>
        <td>{broadcastId}</td>
        <td>
          <Link to={`broadcasts/${campaignId}`}>
            <strong>{campaignId}</strong>
          </Link>
        </td>
        <td>{broadcast.message}</td>
      </tr>
    );
  }

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
            res => (<Table striped hover>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Campaign</th>
                  <th>Message</th>
                </tr>
                {res.data.map(broadcast => BroadcastList.renderRow(broadcast))}
              </tbody>
            </Table>)
          }
        </HttpRequest>
      </Grid>
    );
  }
}
