import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignDetail from './CampaignDetail';
import HttpRequest from '../HttpRequest';

const helpers = require('../../helpers');

class CampaignDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.campaignId = this.props.match.params.campaignId;
    this.url = `/campaigns/${this.campaignId}`;
    this.requestPath = helpers.getCampaignByIdPath(this.campaignId);
  }
  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath}>
          {campaign => (<CampaignDetail campaign={campaign} />)}
        </HttpRequest>
      </Grid>
    );
  }
}

CampaignDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ campaignId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default CampaignDetailContainer;
