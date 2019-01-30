import React from 'react';
import { Col, PageHeader, Panel, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import TriggerListItem from '../TriggerList/TriggerListItem';
import CampaignTopicList from './CampaignTopicList';
import TopicLink from '../TopicLink';
const config = require('../../config');

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  const webSignupConfirmation = props.webSignupConfirmation;
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
                Ends <Moment format={config.dateFormat}>{campaign.endDate}</Moment>
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
                <TriggerListItem trigger={trigger} />
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
          {webSignupConfirmation
            ? (
              <Row componentClass="tr">
                <Col componentClass="td" md={2} />
                <Col componentClass="td" md={6}>{webSignupConfirmation.text}</Col>
                <Col componentClass="td" md={4}>
                  <TopicLink topic={webSignupConfirmation.topic} />
                </Col>
              </Row>
            )
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
  conversationTriggers: PropTypes.array,
  webSignupConfirmations: PropTypes.array,
};

export default CampaignDetail;
