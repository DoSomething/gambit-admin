import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import TopicLink from '../TopicLink';

function getTemporaryTransitionText(topic) {
  const type = topic.type;
  const templates = topic.templates;
  if (type === 'externalPostConfig') {
    return templates.startExternalPost.text;
  }
  if (type === 'photoPostConfig') {
    return templates.startPhotoPost.text;
  }
  if (type === 'textPostConfig') {
    return templates.askText.text;
  }
  return null;
}

const CampaignTriggers = (props) => {
  const campaignTriggers = lodash.filter(props.triggers, (trigger) => {
    const topic = trigger.topic;
    return topic && topic.campaign && topic.campaign.id === props.campaignId;
  });
  return (
    <Table>
      <tbody>
        {campaignTriggers.map(trigger => (
          <Row componentClass="tr" key={trigger}>
            <Col md={3} componentClass="td">
              {trigger.trigger}
            </Col>
            <Col md={6} componentClass="td">
              {trigger.reply || getTemporaryTransitionText(trigger.topic)}
            </Col>
            <Col md={3} componentClass="td">
              <TopicLink topic={trigger.topic} />
            </Col>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

CampaignTriggers.propTypes = {
  triggers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  campaignId: PropTypes.number.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignTriggers;
