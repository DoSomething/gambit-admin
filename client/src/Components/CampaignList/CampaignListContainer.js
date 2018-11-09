import React from 'react';
import { Grid, Panel, Row, Table } from 'react-bootstrap';
import lodash from 'lodash';
import HttpRequest from '../HttpRequest';
import TriggerListItem from '../TriggerList/TriggerListItem';
import WebSignupList from './WebSignupList';
import helpers from '../../helpers';

const CampaignListContainer = () => (
  <Grid>
    <Row>
      <h3>Keywords</h3>
      <HttpRequest path={helpers.getDefaultTopicTriggersPath()}>
        {(res) => {
          const campaignTriggers = lodash.filter(res, (trigger) => {
            const topic = trigger.topic;
            return topic && topic.campaign && topic.campaign.id;
          });
          const triggersByCampaignId = lodash
            .groupBy(campaignTriggers, trigger => trigger.topic.campaign.id);
          return Object.keys(triggersByCampaignId).map((campaignId) => {
            const triggers = lodash.orderBy(triggersByCampaignId[campaignId], 'trigger')
              .map(trigger => <TriggerListItem trigger={trigger} key={trigger.trigger} />);
            return (
              <Panel>
                <Panel.Heading>
                  <Panel.Title toggle>{campaignId}</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <Table><tbody>
                      {triggers}
                    </tbody></Table>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            );
          });
        }}
      </HttpRequest>
      <h3>Web signup confirmations</h3>
      <p>
        These campaigns send a SMS confirmation to a user if the signup is created on the web.
      </p>
    </Row>
    <WebSignupList />
  </Grid>
);


export default CampaignListContainer;
