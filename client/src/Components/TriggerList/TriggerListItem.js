import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import TopicLink from '../TopicLink';

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
        {lodash.truncate(trigger.reply, { length: 60 })}
      </Col>
      <Col md={4} componentClass="td">
        {trigger.topic ? <TopicLink topic={trigger.topic} /> : null}
      </Col>
    </Row>
  );
};

TriggerListItem.propTypes = {
  trigger: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TriggerListItem;
