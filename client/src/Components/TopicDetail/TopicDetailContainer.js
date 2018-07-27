import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TopicDetail from './TopicDetail';
import helpers from '../../helpers';
import queryString from 'query-string';

const TopicDetailContainer = (props) => {
  return (
    <Grid>
      <HttpRequest
        path={helpers.getTopicByIdPath(props.match.params.topicId)}
        query={queryString.parse(window.location.search)}
      >
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
