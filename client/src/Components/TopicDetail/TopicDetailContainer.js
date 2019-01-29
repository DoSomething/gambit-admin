import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import GraphQLQuery from '../GraphQLQuery';
import BroadcastDetail from '../BroadcastDetail/BroadcastDetail';
import TopicDetail from './TopicDetail';
import { getTopicByIdQuery } from '../../graphql';

function isBroadcast(type) {
  const topicBroadcastTypes = [
    'askSubscriptionStatus',
    'askVotingPlanStatus',
    'askYesNo',
  ];
  return topicBroadcastTypes.includes(type);
}

const TopicDetailContainer = props => (
  <Grid>
    <GraphQLQuery
      query={getTopicByIdQuery}
      variables={{id: props.match.params.topicId }}
      displayPager={false}
    > 
      {res => isBroadcast(res.topic.type)
        ? <BroadcastDetail topic={res.topic} />
        : <TopicDetail topic={res.topic} />}
    </GraphQLQuery>
  </Grid>
);

TopicDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicDetailContainer;
