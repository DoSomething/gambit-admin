import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function renderValues(valuesObject) {
  if (!valuesObject) return null;

  const keys = Object.keys(valuesObject);
  return (
    <ul>
      {keys.map(key => <li>{key}: {valuesObject[key]}</li>)}
    </ul>
  );
}

const DraftSubmissionListItem = (props) => {
  const draft = props.draftSubmission;
  const topicId = draft.topicId;
  const userId = draft.conversationId.userId;

  return (
    <Row componentClass="tr" key="draft._id">
      <Col md={1} componentClass="td">
        {draft.createdAt}
      </Col>
      <Col md={3} componentClass="td">
        <Link to={`users/${userId}`}>{userId}</Link>
      </Col>
      <Col md={3} componentClass="td">
        <Link to={`topics/${topicId}`}>{topicId}</Link>
      </Col>
      <Col md={5} componentClass="td">
        {renderValues(draft.values)}
      </Col>
    </Row>
  );
};

DraftSubmissionListItem.propTypes = {
  draftSubmission: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DraftSubmissionListItem;
