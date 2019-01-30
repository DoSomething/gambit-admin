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
        const data = lodash.filter(res.conversationTriggers, (trigger) => {
          const topic = trigger.topic;
          return topic && topic.campaign;
        });

        return (
          <div>
            <h3>Keywords</h3>
            <Table>
              <tbody>
                {data.map(trigger => <TriggerListItem trigger={trigger} key={trigger.trigger} />)}
              </tbody>
            </Table>
          </div>
        );
      }}
    </GraphQLQuery>
  </Grid>
);

export default CampaignListContainer;
