import React from 'react';
import PropTypes from 'prop-types';
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
      <HttpRequest path={this.requestPath}>
        { res => <TopicDetail topic={res} /> }
      </HttpRequest>
    );
  }
}

TopicDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ topicId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicDetailContainer;
