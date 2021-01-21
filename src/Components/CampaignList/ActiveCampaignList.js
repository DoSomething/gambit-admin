import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import GraphQLQuery from '../GraphQLQuery';
import CampaignLink from '../CampaignLink';
import ConversationTrigger from '../ConversationTrigger';

import { getCampaignDashboardQuery } from '../../graphql';
import { getTriggersByCampaignStatus } from '../../helpers';

const CampaignListContainer = () => (
  <Grid>
    <PageHeader>Current campaigns</PageHeader>

    <GraphQLQuery
      query={getCampaignDashboardQuery}
      displayPager={false}
    >
      {(res) => {
        const triggersByStatus = getTriggersByCampaignStatus(res.conversationTriggers);

        return (
          <>
            <h2>Keywords</h2>
            {Object.values(triggersByStatus.active).map(campaign => (
              <div key={campaign.id}>
                <h3><CampaignLink campaign={campaign} /></h3>

                <Table>
                  <tbody>
                    {campaign.triggers.map(item => (
                      <ConversationTrigger trigger={item} key={item.trigger} />
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
          </>
        );
      }}
    </GraphQLQuery>
  </Grid>
);

export default CampaignListContainer;
