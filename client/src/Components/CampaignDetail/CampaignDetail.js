import React from 'react';
import { Col, PageHeader, Panel, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import CampaignTopicList from './CampaignTopicList';
import TriggerList from '../TriggerList/TriggerListContainer';
import TopicLink from '../TopicLink';
const config = require('../../config');

const CampaignDetail = (props) => {
  const campaign = props.campaign;
  const triggers = props.conversationTriggers.filter((item) => {
    return item.topic && item.topic.campaign && item.topic.campaign.id === props.campaign.id;
  });
  const webSignupConfirmation = props.webSignupConfirmations
    .find(item => item.campaignId === campaign.id);

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
          {triggers.map(item => (
            <Row componentClass="tr">
              <Col componentClass="td" md="2"><strong>{item.trigger}</strong></Col>
              <Col componentClass="td" md="6">{item.reply}</Col>
              <Col componentClass="td" md="4"><TopicLink topic={item.topic} /></Col>
            </Row>
          ))}
        </tbody>
      </Table>
      <h3>Web Signup Confirmation</h3>
      <Table>
        <tbody>
          {webSignupConfirmation
            ? (
              <Row componentClass="tr">
                <Col componentClass="td" md="2" />
                <Col componentClass="td" md="6">{webSignupConfirmation.text}</Col>
                <Col componentClass="td" md="4">
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
};

export default CampaignDetail;
