import React from 'react';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import GraphQLQuery from '../GraphQLQuery';
import CampaignLink from '../CampaignLink';
import ConversationTrigger from '../ConversationTrigger';
import WebSignupConfirmation from '../WebSignupConfirmation';

import { getCampaignDashboardQuery } from '../../graphql';
import helpers from '../../helpers';

const CampaignListContainer = () => (
  <Grid>
    <PageHeader>Current campaigns</PageHeader>
    <GraphQLQuery
      query={getCampaignDashboardQuery}
      displayPager={false}
    >
      {(res) => {
        const triggersByStatus = helpers.getCampaignsByStatus(res.conversationTriggers);
        const webSignupConfirmations = res.webSignupConfirmations
          .filter(item => !helpers.hasEnded(item.campaign));
        return (
          <div>
            <h2>Keywords</h2>
            {Object.values(triggersByStatus.active).map(campaign => (
              <div>
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
            <h2>Web Signup Confirmations</h2>
            <Table>
              <tbody>
                {webSignupConfirmations.length
                  ? webSignupConfirmations.map((item) => (
                    <WebSignupConfirmation
                      key={item.campaign.id}
                      webSignupConfirmation={item}
                      displayCampaign={true}
                    />
                  ))
                  : (
                    <Row componentClass="tr">
                      <Col componentClass="td">
                        No web signup confirmations found for any active campaigns.
                      </Col>
                    </Row>
                  )}
              </tbody>
            </Table>
          </div>
        );
      }}
    </GraphQLQuery>
  </Grid>
);

export default CampaignListContainer;
