import React from 'react';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DraftSubmissionValues from './DraftSubmissionValues';

const DraftSubmissionDetail = (props) => {
  const draft = props.draftSubmission;
  return (
    <div>
      <Panel>
        <Panel.Body>
          <p>
            <strong>User:</strong> {draft.conversationId.userId}
          </p>
          <p>
            <strong>Topic:</strong> {draft.topicId}
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
