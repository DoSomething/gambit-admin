import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import queryString from 'query-string';
import BroadcastDetail from './BroadcastDetail';
import helpers from '../../helpers';


const BroadcastDetailContainer = (props) => {
  return (
    <Grid>
      <HttpRequest
        path={helpers.getBroadcastByIdPath(props.match.params.broadcastId)}
        query={queryString.parse(window.location.search)}
      >
      {res => <BroadcastDetail broadcast={res.data} />}
      </HttpRequest>
    </Grid>
  );
}

BroadcastDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ broadcastId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default BroadcastDetailContainer;
