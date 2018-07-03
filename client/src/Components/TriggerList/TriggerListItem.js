import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentfulLink from '../ContentfulLink';

/**
 * @param {Object} trigger
 * @return {String}
 */
function getResponseFromTrigger(trigger) {
  if (trigger.topic) {
    const url = `/topics/${trigger.topic.id}`;
    return <Link to={url}>{trigger.topic.name}</Link>;
  }
  if (trigger.redirect) {
    return <a href={`#${encodeURIComponent(trigger.redirect)}`}>{`@ ${trigger.redirect}`}</a>;
  }
  return trigger.reply;
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
          <Col md={1}>
            <ContentfulLink bsStyle="link" bsSize="xsmall" entryId={trigger.id} />
          </Col>
        </Row>
      </ScrollableAnchor>
    </td></tr>
  );
};

TriggerListItem.propTypes = {
  trigger: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TriggerListItem;
