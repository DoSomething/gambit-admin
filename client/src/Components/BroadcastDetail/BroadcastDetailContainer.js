import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastDetail from './BroadcastDetail';

const helpers = require('../../helpers');

class BroadcastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.broadcastId = this.props.match.params.broadcastId;
    this.requestPath = helpers.getBroadcastByIdPath(this.broadcastId);
  }

  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath}>
          {res => <BroadcastDetail broadcast={res.data} macro={this.macro} />}
        </HttpRequest>
      </Grid>
    );
  }
}

BroadcastContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ broadcastId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default BroadcastContainer;
