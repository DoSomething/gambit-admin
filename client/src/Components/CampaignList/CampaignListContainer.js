import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import CampaignListItem from './CampaignListItem';

const helpers = require('../../helpers');

export default class CampaignList extends React.Component {
  constructor(props) {
    super(props);
    this.requestPath = helpers.getCampaignsPath();
  }
  render() {
    return (
      <Grid>
        <PageHeader>Campaigns</PageHeader>
        <HttpRequest path={this.requestPath}>
          {
            res => (<Table striped hover>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Triggers</th>
                  <th>Status</th>
                </tr>
                {res.map(campaign => <CampaignListItem key={campaign.id} campaign={campaign} />)}
              </tbody>
            </Table>)
          }
        </HttpRequest>
      </Grid>
    );
  }
}
