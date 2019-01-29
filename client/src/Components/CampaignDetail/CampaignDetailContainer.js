import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignDetail from './CampaignDetail';
import GraphQLQuery from '../GraphQLQuery';
import { getCampaignDetailByCampaignIdQuery } from '../../graphql';

const CampaignDetailContainer = props => (
  <Grid>
    <GraphQLQuery
      query={getCampaignDetailByCampaignIdQuery}
      variables={{id: Number(props.match.params.campaignId) }}
      displayPager={false}
    >
      {res => (
        <CampaignDetail
          campaign={res.campaign}
          conversationTriggers={res.conversationTriggers}
          webSignupConfirmations={res.webSignupConfirmations}
        />
      )}
    </GraphQLQuery>
  </Grid>
);
  
CampaignDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ campaignId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default CampaignDetailContainer;
