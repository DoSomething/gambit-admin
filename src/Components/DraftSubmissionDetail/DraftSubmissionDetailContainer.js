import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DraftSubmissionDetail from './DraftSubmissionDetail';
import HttpRequest from '../HttpRequest';
import helpers from '../../helpers';

const DraftSubmissionDetailContainer = props => (
  <Grid>
    <HttpRequest
      path={helpers.getDraftSubmissionByIdPath(props.match.params.draftSubmissionId)}
      query={{ populate: 'conversationId' }}
    >
      {res => (<DraftSubmissionDetail draftSubmission={res.data} />)}
    </HttpRequest>
  </Grid>
);


DraftSubmissionDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ draftSubmissionId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default DraftSubmissionDetailContainer;
