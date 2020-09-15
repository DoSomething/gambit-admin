import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CampaignLink = ({ campaign: { id, internalTitle }}) => (
  <Link to={`/campaigns/${id}`}>{internalTitle}</Link>
);

CampaignLink.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CampaignLink;
