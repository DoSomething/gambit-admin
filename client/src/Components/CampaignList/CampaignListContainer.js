import React from 'react';
import { Grid, Panel, Row, Table } from 'react-bootstrap';
import lodash from 'lodash';

import HttpRequest from '../HttpRequest';
import CampaignLink from '../CampaignLink';
import TriggerListItem from '../TriggerList/TriggerListItem';
import WebSignupList from './WebSignupList';
import helpers from '../../helpers';

const webSignupHelpText = 'Users who sign up for the following campaigns over web will receive a SMS confirmation if they have provided their mobile number.';

const CampaignListContainer = () => (
  <Grid>
    <Row>
      <h3>Keywords</h3>
      <p>
        Users may signup for the following campaigns by sending a SMS keyword.
      </p>
      <HttpRequest path={helpers.getDefaultTopicTriggersPath()}>
        {(res) => {
          // Find all triggers that have a topic campaign.
          const campaignTriggers = res.filter((trigger) => {
            const topic = trigger.topic;
            return topic && topic.campaign && topic.campaign.id;
          });
          // Group by topic campaign id.
          const triggersByCampaignId = lodash
            .groupBy(campaignTriggers, trigger => trigger.topic.campaign.id);
          // Loop through each campaign id and list triggers.
          return Object.keys(triggersByCampaignId).map((campaignId) => {
            const data = lodash.orderBy(triggersByCampaignId[campaignId], 'trigger');
            const campaign = data[0].topic.campaign;
            return (
              <Panel key={campaignId}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <CampaignLink campaign={campaign} linkDisabled />
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <Table>
                      <tbody>
                        {data.map(item => <TriggerListItem trigger={item} key={item.trigger} />)}
                      </tbody>
                    </Table>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            );
          });
        }}
      </HttpRequest>
      <h3>Web signup confirmations</h3>
      <p>{webSignupHelpText}</p>
      <WebSignupList />
    </Row>
  </Grid>
);


export default CampaignListContainer;
