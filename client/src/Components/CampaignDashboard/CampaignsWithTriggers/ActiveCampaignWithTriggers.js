import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CampaignLink from '../../CampaignLink';
import TriggerListItem from '../../TriggerList/TriggerListItem';

// TODO: Fix warning for TriggerListItem, which is rendering a tr inside of a td.
const ActiveCampaignWithTriggers = (props) => {
  const campaign = props.campaign;
  return (
    <div>
      <p><CampaignLink campaign={campaign} /></p>
      <Table>
        <tbody>
          {campaign.triggers.map(item => <TriggerListItem trigger={item} key={item.trigger} />)}
        </tbody>
      </Table>
    </div>
  );
};

ActiveCampaignWithTriggers.propTypes = {
  campaign: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ActiveCampaignWithTriggers;
