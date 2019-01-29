import React from 'react';
import { Grid, PageHeader} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignDetail from './CampaignDetail';
import GraphQLQuery from '../GraphQLQuery';
import { getCampaignDetailByCampaignIdQuery } from '../../graphql';

const CampaignDetailContainer = props => (
  <GraphQLQuery
    query={getCampaignDetailByCampaignIdQuery}
    variables={{id: Number(props.match.params.campaignId) }}
    displayPager={false}
  >
    {res => (
      <CampaignDetail
        campaign={res.campaign}
        conversationTriggers={res.conversationTriggers}
      />
    )}
  </GraphQLQuery>
);
  
CampaignDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ campaignId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default CampaignDetailContainer;
