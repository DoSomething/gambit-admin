import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CampaignLink from '../../CampaignLink';
import ConversationTrigger from '../../ConversationTrigger';

const ActiveCampaignWithTriggers = (props) => {
  const campaign = props.campaign;
  return (
    <div>
      <h4><CampaignLink campaign={campaign} /></h4>
      <Table>
        <tbody>
          {campaign.triggers.map(item => <ConversationTrigger trigger={item} key={item.trigger} />)}
        </tbody>
      </Table>
    </div>
  );
};

ActiveCampaignWithTriggers.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ActiveCampaignWithTriggers;
