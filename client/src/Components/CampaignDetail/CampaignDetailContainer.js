import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignDetail from './CampaignDetail';
import GraphQLQuery from '../GraphQLQuery';
import { getCampaignDetailByIdQuery } from '../../graphql';

const CampaignDetailContainer = props => {
  const campaignId = Number(props.match.params.campaignId);
  return (
    <Grid>
      <GraphQLQuery
        query={getCampaignDetailByIdQuery}
        variables={{ id: campaignId }}
        displayPager={false}
      >
        {res => {
          const conversationTriggers = res.conversationTriggers.filter((item) => {
            return item.topic && item.topic.campaign && item.topic.campaign.id === campaignId;
          })
          const webSignupConfirmation = res.webSignupConfirmations
            .find(item => item.campaign.id === campaignId);
          return (
            <CampaignDetail
              campaign={res.campaign}
              conversationTriggers={conversationTriggers}
              webSignupConfirmation={webSignupConfirmation}
            />
          );
        }}
      </GraphQLQuery>
    </Grid>
  );
};
  
CampaignDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ campaignId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default CampaignDetailContainer;
