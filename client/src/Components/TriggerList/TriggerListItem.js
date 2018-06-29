import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentfulLink from '../ContentfulLink';

function getResponseFromTrigger(trigger) {
  if (trigger.topicId) {
    const url = `/topics/${trigger.topicId}`;
    return <Link to={url}>{trigger.topic.name}</Link>;
  }
  if (trigger.redirect) {
    return `@ ${trigger.redirect}`;
  }
  return trigger.reply;
}

const TriggerListItem = (props) => {
  const trigger = props.trigger;
  return (
    <tr><td>
      <Row key={trigger.id}>
        <Col md={3}><strong>{trigger.trigger}</strong></Col>
        <Col md={8}>{getResponseFromTrigger(trigger)}</Col>
        <Col md={1}>
          <ContentfulLink bsStyle="link" bsSize="xsmall" entryId={trigger.id} />
        </Col>
      </Row>
    </td></tr>
  );
};

TriggerListItem.propTypes = {
  trigger: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TriggerListItem;
