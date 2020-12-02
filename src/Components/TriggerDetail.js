import React from 'react';
import { Col, Row } from 'react-bootstrap';

import helpers from '../helpers';

const TriggerDetail = ({ trigger }) => (
  <Row componentClass="tr" key={trigger.trigger}>
    <Col componentClass="td">
      {trigger.contentfulId ? (
        <a href={helpers.getContentfulUrlForEntryId(trigger.contentfulId)}>
          {trigger.trigger}
        </a>
        ) : (
        <>
          {trigger.trigger}
        </>
       )}
    </Col>
    
    <Col componentClass="td">
      {!trigger.redirect ? trigger.reply : `@ ${trigger.redirect}`}
    </Col>
  </Row>
);

export default TriggerDetail;