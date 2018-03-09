import React from 'react';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import Broadcast from './Broadcast';

const helpers = require('../../helpers');

class BroadcastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.broadcastId = this.props.match.params.broadcastId;
    this.requestPath = helpers.getBroadcastByIdPath(this.broadcastId);
  }

  render() {
    return (
      <HttpRequest path={this.requestPath}>
        {res => <Broadcast broadcast={res.data} macro={this.macro} />}
      </HttpRequest>
    );
  }
}

BroadcastContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ broadcastId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default BroadcastContainer;
