import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CampaignLink = (props) => {
  const campaign = props.campaign;
  const label = <span><strong>{campaign.title}</strong> ({campaign.id}) - {campaign.status}</span>;
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
