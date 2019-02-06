import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastStats from './BroadcastStats';
import BroadcastWebhook from './BroadcastWebhook';
import helpers from '../../helpers';

const BroadcastStatsContainer = ({ broadcastId}) => (
  <Grid>
    <HttpRequest
      path={helpers.getBroadcastByIdPath(broadcastId)}
    >
      {res => (
        <div>
          <BroadcastStats stats={res.data.stats} />
          <BroadcastWebhook config={res.data.webhook} />
        </div>
      )}
    </HttpRequest>
  </Grid>
);

BroadcastStatsContainer.propTypes = {
  broadcastId: PropTypes.string.isRequired,
};

export default BroadcastStatsContainer;
