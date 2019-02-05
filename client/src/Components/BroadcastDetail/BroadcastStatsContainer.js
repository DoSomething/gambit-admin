import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastStats from './BroadcastStats';
import helpers from '../../helpers';

const BroadcastStatsContainer = ({ broadcastId}) => (
  <Grid>
    <HttpRequest
      path={helpers.getBroadcastByIdPath(broadcastId)}
    >
      {res => <BroadcastStats stats={res.data.stats} />}
    </HttpRequest>
  </Grid>
);

BroadcastStatsContainer.propTypes = {
  broadcastId: PropTypes.string.isRequired,
};

export default BroadcastStatsContainer;
