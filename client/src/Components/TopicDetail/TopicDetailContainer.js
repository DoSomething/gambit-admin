import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import BroadcastDetail from '../BroadcastDetail/BroadcastDetail';
import TopicDetail from './TopicDetail';
import helpers from '../../helpers';

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
    <HttpRequest
      path={helpers.getTopicByIdPath(props.match.params.topicId)}
      query={queryString.parse(window.location.search)}
    >
      {(res) => {
        if (isBroadcast(res.type)) {
          return <BroadcastDetail broadcast={res} />;
        }
        return <TopicDetail topic={res} />;
      }}
    </HttpRequest>
  </Grid>
);

TopicDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicDetailContainer;
