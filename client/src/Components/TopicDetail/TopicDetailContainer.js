import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TopicDetail from './TopicDetail';
import helpers from '../../helpers';

const TopicDetailContainer = (props) => {
  const topicId = props.match.params.topicId;
  const requestPath = helpers.getTopicByIdPath(topicId);
  return (
    <Grid>
      <HttpRequest path={requestPath}>
        {res => <TopicDetail topic={res} />}
      </HttpRequest>
    </Grid>
  );
};

TopicDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicDetailContainer;
