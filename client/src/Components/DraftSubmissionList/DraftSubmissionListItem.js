import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import DraftSubmissionValues from '../DraftSubmissionDetail/DraftSubmissionValues';
import config from '../../config';

const DraftSubmissionListItem = (props) => {
  const draft = props.draftSubmission;
  const topicId = draft.topicId;
  const userId = draft.conversationId.userId;

  return (
    <Row componentClass="tr" key="draft._id">
      <Col md={1} componentClass="td">
        <Link to={`draftSubmissions/${draft._id}`}>
          <Moment format={config.dateFormat}>{draft.createdAt}</Moment>
        </Link>
      </Col>
      <Col md={3} componentClass="td">
        <Link to={`users/${userId}`}>{userId}</Link>
      </Col>
      <Col md={3} componentClass="td">
        <Link to={`topics/${topicId}`}>{topicId}</Link>
      </Col>
      <Col md={5} componentClass="td">
        <DraftSubmissionValues draftSubmission={draft} />
      </Col>
    </Row>
  );
};

DraftSubmissionListItem.propTypes = {
  draftSubmission: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DraftSubmissionListItem;
