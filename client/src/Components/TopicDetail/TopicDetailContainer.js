import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TopicDetail from './TopicDetail';

const helpers = require('../../helpers');

class TopicDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.topicId = this.props.match.params.topicId;
    this.requestPath = helpers.getTopicByIdPath(this.topicId);
  }

  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath}>
          { res => <TopicDetail topic={res} /> }
        </HttpRequest>
      </Grid>
    );
  }
}

TopicDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicDetailContainer;
