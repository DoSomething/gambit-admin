import React from 'react';
import { Col, PageHeader, Panel, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ConversationTrigger from '../ConversationTrigger';
import CampaignTopicList from './CampaignTopicList';
import WebSignupConfirmation from '../WebSignupConfirmation';
import config from '../../config';
import helpers from '../../helpers';

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  return (
    <div>
      <PageHeader>
        {campaign.internalTitle}
      </PageHeader>
      <Panel>
        <Panel.Body>
          <p>
          {campaign.endDate
            ? (
              <span>
                {helpers.hasEnded(campaign) ? 'Ended' : 'Ends'} <Moment format={config.dateFormat}>{campaign.endDate}</Moment>
              </span>
            )
            : <span>(No end date)</span>}
          </p>
        </Panel.Body>
      </Panel>
      <h3>Keywords</h3>
      <Table>
        <tbody>
          {props.conversationTriggers.length
            ? props.conversationTriggers.map(trigger => (
              <ConversationTrigger key={trigger.trigger} trigger={trigger} />
            ))
            : (
              <Row componentClass="tr">
                <Col componentClass="td">
                  (No keywords)
                </Col>
              </Row>
            )}
        </tbody>
      </Table>      
      <h3>Web Signup Confirmation</h3>
      <Table>
        <tbody>
          {props.webSignupConfirmation
            ? <WebSignupConfirmation webSignupConfirmation={props.webSignupConfirmation} />
            : (
              <Row componentClass="tr">
                <Col componentClass="td">
                  (No web signup confirmation)
                </Col>
              </Row>
            )}
        </tbody>
      </Table>
      <h3>Topics</h3>
      <CampaignTopicList campaignId={campaign.id} />
    </div>
  );
};

CampaignDetail.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  conversationTriggers: PropTypes.array.isRequired,
  webSignupConfirmation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CampaignDetail;
