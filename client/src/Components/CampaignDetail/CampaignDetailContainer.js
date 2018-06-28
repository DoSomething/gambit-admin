import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignDetail from './CampaignDetail';
import HttpRequest from '../HttpRequest';

const helpers = require('../../helpers');

class CampaignDetailContainer extends React.Component {
  render() {
    return (
      <Grid>
        <HttpRequest path={helpers.getCampaignByIdPath(this.props.match.params.campaignId)}>
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
