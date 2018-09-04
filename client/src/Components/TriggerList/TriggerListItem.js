import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {Object} trigger
 * @return {String}
 */
function getResponseFromTrigger(trigger) {
  if (trigger.redirect) {
    return <a href={`#${encodeURIComponent(trigger.redirect)}`}>{`@ ${trigger.redirect}`}</a>;
  }
  const reply = trigger.reply[0];
  if (reply.includes('changeTopic')) {
    const topicChangeCommand = reply.replace(/{(.*)}/, '$1').split('=');
    const topicId = topicChangeCommand[1];
    return <Link to={`/topics/${topicId}`}>{topicId}</Link>;
  }
  return trigger.reply[0];
}

const TriggerListItem = (props) => {
  const trigger = props.trigger;
  const triggerText = trigger.trigger;
  const anchor = encodeURIComponent(triggerText);
  return (
    <tr><td>
      <ScrollableAnchor id={anchor}>
        <Row key={trigger.id}>
          <Col md={3}>
            <a href={`#${anchor}`}><strong>{triggerText}</strong></a>
          </Col>
          <Col md={8}>{getResponseFromTrigger(trigger)}</Col>
        </Row>
      </ScrollableAnchor>
    </td></tr>
  );
};

TriggerListItem.propTypes = {
  trigger: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TriggerListItem;
