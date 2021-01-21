import React from 'react';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import GraphQLQuery from '../GraphQLQuery';
import CampaignLink from '../CampaignLink';

import { getCampaignDashboardQuery } from '../../graphql';
import helpers from '../../helpers';
import config from '../../config';

const CampaignListContainer = () => (
  <Grid>
    <PageHeader>Ended campaigns</PageHeader>
    <GraphQLQuery
      query={getCampaignDashboardQuery}
      displayPager={false}
    >
      {(res) => {
        const triggersByStatus = helpers.getTriggersByCampaignStatus(res.conversationTriggers);

        return (
          <>
            <h2>Keywords</h2>

            <p>If a user sends one of these keywords, they will receive a message indicating the campaign is no longer available.</p>

            <Table>
               <tbody>
                {Object.values(triggersByStatus.closed).map(campaign => (
                  <Row componentClass="tr" key={campaign.id}>
                    <Col componentClass="td" md={3}>
                      <CampaignLink campaign={campaign} />
                    </Col>
                    <Col componentClass="td" md={3}>
                      Ended <Moment format={config.dateFormat}>{campaign.endDate}</Moment>
                    </Col>
                    <Col componentClass="td" md={6}>
                      <ul>
                        {campaign.triggers.map(item => (
                          <li key={item.id}>
                            <a href={helpers.getContentfulUrlForEntryId(item.id)}>
                              <strong>{item.trigger}</strong>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </Col>

                  </Row>
                ))}
              </tbody>
            </Table>
          </>
        );
      }}
    </GraphQLQuery>
  </Grid>
);

export default CampaignListContainer;
