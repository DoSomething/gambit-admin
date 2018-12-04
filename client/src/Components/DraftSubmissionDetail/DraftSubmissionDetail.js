import React from 'react';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DraftSubmissionValues from './DraftSubmissionValues';
import config from '../../config';

const DraftSubmissionDetail = (props) => {
  const draft = props.draftSubmission;
  const topicId = draft.topicId;
  const userId = draft.conversationId.userId;
  return (
    <div>
      <Panel>
        <Panel.Body>
          <p>
            <Moment format={config.dateFormat}>{draft.createdAt}</Moment>
          </p>
          <p>
            <strong>User:</strong> <Link to={`/users/${userId}`}>{userId}</Link>
          </p>
          <p>
            <strong>Topic:</strong> <Link to={`/topics/${topicId}`}>{topicId}</Link>
          </p>
          <DraftSubmissionValues draftSubmission={draft} />
        </Panel.Body>
      </Panel>
    </div>
  );
};

DraftSubmissionDetail.propTypes = {
  draftSubmission: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DraftSubmissionDetail;
