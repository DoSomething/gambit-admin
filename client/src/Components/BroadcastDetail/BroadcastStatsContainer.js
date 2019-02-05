import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import BroadcastDetail from './BroadcastDetail';
import helpers from '../../helpers';

const BroadcastDetailContainer = props => (
  <Grid>
    <HttpRequest
      path={helpers.getBroadcastByIdPath(props.match.params.broadcastId)}
      query={queryString.parse(window.location.search)}
    >
      {res => <BroadcastDetail broadcast={res.data} />}
    </HttpRequest>
  </Grid>
);

BroadcastDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ broadcastId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default BroadcastDetailContainer;
