import React from 'react';
import { Grid, Row, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import ActiveCampaignWtithTriggers from './CampaignsWithTriggers/ActiveCampaignWithTriggers';
import ClosedCampaignWtithTriggers from './CampaignsWithTriggers/ClosedCampaignWithTriggers';
import WebSignupList from './WebSignupList';
import helpers from '../../helpers';

const webSignupHelpText = 'Users who sign up for the following campaigns over web will receive a SMS confirmation if they have provided their mobile number.';

const CampaignListContainer = () => (
  <Grid>
    <Row>
      <h2>Keywords</h2>
      <HttpRequest path={helpers.getDefaultTopicTriggersPath()}>
        {(res) => {
          const campaignsByStatus = helpers.getCampaignsByStatus(res);
          return (
            <div>
              <h3>Active</h3>
              <Table>
                <tbody>
                  {Object.values(campaignsByStatus.active).map(campaign => (
                    <ActiveCampaignWtithTriggers
                      key={campaign.id}
                      campaign={campaign}
                    />))}
                </tbody>
              </Table>
              <h3>Closed</h3>
              <Table>
                <tbody>
                  {Object.values(campaignsByStatus.closed).map(campaign => (
                    <ClosedCampaignWtithTriggers
                      key={campaign.id}
                      campaign={campaign}
                    />))}
                </tbody>
              </Table>
            </div>
          );
        }}
      </HttpRequest>
      <h3>Web signup confirmations</h3>
      <p>{webSignupHelpText}</p>
      <WebSignupList />
    </Row>
  </Grid>
);

export default CampaignListContainer;
