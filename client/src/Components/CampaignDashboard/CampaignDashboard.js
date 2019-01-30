import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import lodash from 'lodash';
import GraphQLQuery from '../GraphQLQuery';
import ActiveCampaignWithTriggers from './CampaignsWithTriggers/ActiveCampaignWithTriggers';
import ClosedCampaignWithTriggers from './CampaignsWithTriggers/ClosedCampaignWithTriggers';
import TriggerListItem from '../TriggerList/TriggerListItem';

import { getConversationTriggersQuery } from '../../graphql';
import helpers from '../../helpers';

const CampaignListContainer = () => (
  <Grid>
    <GraphQLQuery
      query={getConversationTriggersQuery}
      displayPager={false}
    >
      {(res) => {
        const campaignsByStatus = helpers.getCampaignsByStatus(res.conversationTriggers);
        return (
          <div>
            <h3>Current campaigns</h3>
            {Object.values(campaignsByStatus.active).map(campaign => (
              <ActiveCampaignWithTriggers
                key={campaign.id}
                campaign={campaign}
              />))}
            <h3>Closed campaigns</h3>
            <Table>
              <tbody>
                {Object.values(campaignsByStatus.closed).map(campaign => (
                  <ClosedCampaignWithTriggers
                    key={campaign.id}
                    campaign={campaign}
                  />))}
              </tbody>
            </Table>
          </div>
        );
      }}
    </GraphQLQuery>
  </Grid>
);

export default CampaignListContainer;
