import React from 'react';
import PropTypes from 'prop-types';
import { Grid, PageHeader } from 'react-bootstrap';
import queryString from 'query-string';
import GraphQLQuery from '../GraphQLQuery';
import BroadcastDetail from '../BroadcastDetail/BroadcastDetail';
import TopicDetail from './TopicDetail';
import helpers from '../../helpers';
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
      {(res) => {
        const topic = res.topic;
        return (
          <div>
            <PageHeader>
              {topic.name}
            </PageHeader>
            <p>{topic.__typename}</p>
          </div>
        );
      }}
    </GraphQLQuery>
  </Grid>
);

TopicDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicDetailContainer;
