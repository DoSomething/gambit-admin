import React from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import TopicLink from './TopicLink';
import helpers from '../helpers';

const TriggerListItem = (props) => {
  const trigger = props.trigger;
  return (
    <Row componentClass="tr" key={trigger}>
      <Col md={2} componentClass="td">
        <a href={helpers.getContentfulUrlForEntryId(trigger.id)}>
          <strong>{trigger.trigger}</strong>
        </a>
      </Col>
      <Col md={6} componentClass="td">
        <OverlayTrigger
          overlay={(
            <Popover id={trigger.id}>
              {trigger.reply}
            </Popover>
          )}
        >
          <p>
            {lodash.truncate(trigger.reply, { length: 80 })}
          </p>
        </OverlayTrigger>
        
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
