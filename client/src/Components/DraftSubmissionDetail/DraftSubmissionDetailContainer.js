import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DraftSubmissionDetail from './DraftSubmissionDetail';
import HttpRequest from '../HttpRequest';
import helpers from '../../helpers';

const query = { populate: 'conversationId' };

class DraftSubmissionDetailContainer extends React.Component {
  render() {
    const draftId = this.props.match.params.draftSubmissionId;
    return (
      <Grid>
        <HttpRequest path={helpers.getDraftSubmissionByIdPath(draftId)} query={query}>
          {res => (<DraftSubmissionDetail draftSubmission={res.data} />)}
        </HttpRequest>
      </Grid>
    );
  }
}

DraftSubmissionDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ draftSubmissionId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default DraftSubmissionDetailContainer;
