import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import GraphQLQuery from '../GraphQLQuery';
import BroadcastDetail from './BroadcastDetail';
import { getBroadcastByIdQuery } from '../../graphql';

const BroadcastDetailContainer = props => (
  <Grid>
    <GraphQLQuery
      query={getBroadcastByIdQuery}
      variables={{id: props.match.params.broadcastId }}
      displayPager={false}
    > 
       {res => <BroadcastDetail broadcast={res.broadcast} />}
    </GraphQLQuery>
  </Grid>
);

BroadcastDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default BroadcastDetailContainer;
