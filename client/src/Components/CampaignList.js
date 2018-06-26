import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from './HttpRequest';

const helpers = require('../helpers');

export default class CampaignList extends React.Component {
  static renderRow(campaign) {
    const campaignId = campaign.id;
    const triggers = campaign.topics[0].triggers;

    return (
      <tr key={campaignId}>
        <td>{campaignId}</td>
        <td>
          <Link to={`campaigns/${campaignId}`}>
            <strong>{campaign.title}</strong>
          </Link>
        </td>
        <td>{triggers ? triggers.join(', ') : null}</td>
        <td>{campaign.status}</td>
      </tr>
    );
  }

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
                {res.map(campaign => CampaignList.renderRow(campaign))}
              </tbody>
            </Table>)
          }
        </HttpRequest>
      </Grid>
    );
  }
}
