import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from './HttpRequest';

const helpers = require('../helpers');

export default class CampaignList extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = helpers.getCampaignsUrl({ exclude: true });
  }

  render() {
    return (
      <Grid>
        <PageHeader>Campaigns</PageHeader>
        { this.renderList() }
      </Grid>
    );
  }

  renderList() {
    return (
      <HttpRequest url={ this.requestUrl }>
        {
          (result) => (
            <Table striped hover>
              <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Keywords</th>
                <th>Status</th>
              </tr>
              { result.body.map(campaign => this.renderSummary(campaign)) }
              </tbody>
            </Table>
          )
        }
      </HttpRequest>
    );
  }

  renderSummary(campaign) {
    const campaignId = campaign.id;

    return (
      <tr key={ campaignId }>
        <td>{ campaignId }</td>
        <td>
          <Link to={ `campaigns/${campaignId}` }>
            <strong>{ campaign.title }</strong>
          </Link>
        </td>
        <td>{ campaign.keywords.join(', ') }</td>
        <td>{ campaign.status }</td>
      </tr>
    );
  }
}
