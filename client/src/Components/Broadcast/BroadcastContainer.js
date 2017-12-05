import React from 'react';
import { Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import Broadcast from './Broadcast';

const helpers = require('../../helpers');

class BroadcastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.broadcastId = this.props.match.params.broadcastId;
    this.requestUrl = helpers.getBroadcastIdUrl(this.broadcastId);
  }

  render() {
    return (
      <Grid>
        <PageHeader><small>{this.broadcastId}</small></PageHeader>
        <HttpRequest url={this.requestUrl}>
          {res => <Broadcast broadcast={res.data} />}
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
