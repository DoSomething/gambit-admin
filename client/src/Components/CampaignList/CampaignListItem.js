import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CampaignListItem = (props) => {
  const campaign = props.campaign;
  const campaignId = campaign.id;
  const triggers = campaign.topics[0].triggers;

  return (
    <tr key={campaignId}>
      <td>{campaignId}</td>
      <td>
        <Link to={`campaigns/${campaignId}`}>
          <strong>{campaign.title}</strong>
        </Link>
      </td>
      <td>{triggers ? triggers.join(', ') : null}</td>
      <td>{campaign.status}</td>
    </tr>
  );
};

CampaignListItem.propTypes = {
  campaign: PropTypes.shape.isRequired,
};

export default CampaignListItem;
