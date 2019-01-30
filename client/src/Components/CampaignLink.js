import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const CampaignLink = (props) => {
  const campaign = props.campaign;
  return (
    <Link to={`/campaigns/${campaign.id}`}>{campaign.internalTitle}</Link>
  );
};

CampaignLink.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignLink;
