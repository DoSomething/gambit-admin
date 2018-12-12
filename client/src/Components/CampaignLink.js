import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const CampaignLink = (props) => {
  const campaign = props.campaign;
  let endsLabel = null;
  if (campaign.endDate) {
    endsLabel = <small> - Ends <Moment format={'MM/DD/YY'}>{campaign.endDate}</Moment></small>;
  }

  const label = <span><strong>{campaign.internalTitle}</strong> ({campaign.id}){endsLabel}</span>;
  if (props.linkDisabled === true) {
    return label;
  }
  return (
    <Link to={`/campaigns/${campaign.id}`}>{label}</Link>
  );
};

CampaignLink.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  linkDisabled: PropTypes.bool,
};

CampaignLink.defaultProps = {
  linkDisabled: false,
};

export default CampaignLink;
