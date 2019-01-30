import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CampaignLink = props => (
  <Link to={`/campaigns/${props.campaign.id}`}>{props.campaign.internalTitle}</Link>
);

CampaignLink.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignLink;
