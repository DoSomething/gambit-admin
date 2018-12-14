import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';

const query = `{
  campaigns(count: 100) {
    id,
    internalTitle,
    startDate,
    endDate,
  }
}`;

const CampaignListContainer = () => (
  <Grid>
    <HttpRequest path="graphql" query={{ query }}>
      {
        res => (
          <Table>
            <tbody>
              {res.campaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.internalTitle}</td>
                  <td>{campaign.startDate}</td>
                  <td>{campaign.endDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      }
    </HttpRequest>
  </Grid>
);

export default CampaignListContainer;
