import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor';
import PropTypes from 'prop-types';
import TopicLink from '../TopicLink';
import ContentfulLink from '../ContentfulLink';

/**
 * @param {Object} topic
 * @return {String}
 */
function getTemporaryTransitionText(topic) {
  if (!topic) {
    return null;
  }
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

const TriggerListItem = (props) => {
  const trigger = props.trigger;
  return (
    <Row componentClass="tr" key={trigger}>
      <Col md={2} componentClass="td">
        <ScrollableAnchor id={encodeURIComponent(trigger.trigger)}>
          <strong>{trigger.trigger}</strong>
        </ScrollableAnchor>
      </Col>
      <Col md={6} componentClass="td">
        {trigger.reply || getTemporaryTransitionText(trigger.topic)}
      </Col>
      <Col md={4} componentClass="td">
        <ContentfulLink entryId={trigger.id} displayRefresh={false} />
        {trigger.topic ? <TopicLink topic={trigger.topic} /> : null}
      </Col>
    </Row>
  );
};

TriggerListItem.propTypes = {
  trigger: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TriggerListItem;
