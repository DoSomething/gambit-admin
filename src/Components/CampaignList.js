import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const gambit = require('../gambit');

export default class CampaignList extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = gambit.conversationsUrl(`campaigns?sort=title&query={"status":"active"}`);
  }

  render() {
    return (
      <Grid fluid={true}>
        <PageHeader>Campaigns</PageHeader>
        { this.renderList() }
      </Grid>
    );
  }

  renderList() {
    return (
      <Request
        url={ this.requestUrl }
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <RequestLoading />;
            } else if (error) {
              return <RequestError error={error} />
            } else {
              return (
                <Table striped hover>
                  <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Keywords</th>
                  </tr>
                  { result.body.map(campaign => this.renderSummary(campaign)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    );
  }

  renderSummary(campaign) {
    const campaignId = campaign._id;

    return (
      <tr key={ campaignId }>
        <td>{ campaignId }</td>
        <td>
          <Link to={ `campaigns/${campaignId}` }>
            <strong>{ campaign.title }</strong>
          </Link>
        </td>
        <td>{ campaign.keywords.join(', ') }</td>
      </tr>
    );
  }
}