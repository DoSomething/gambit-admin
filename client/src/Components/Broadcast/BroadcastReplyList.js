import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Grid } from 'react-bootstrap';
import MessageList from '../MessageList/MessageListContainer';

const lodash = require('lodash');

function formatMacro(macroName) {
  const macroLabels = {
    confirmedCampaign: 'Yes',
    declinedCampaign: 'No',
    subscriptionStatusStop: 'Unsubscribe',
  };
  return lodash.get(macroLabels, macroName, 'Other');
}

class BroadcastReplyList extends React.Component {
  render() {
    const broadcastId = this.props.match.params.broadcastId;
    const macro = this.props.match.params.macro;
    const url = `/broadcasts/${broadcastId}`;

    return (
      <Grid>
        <Breadcrumb>
          <Breadcrumb.Item href="/broadcasts">
            Broadcasts
          </Breadcrumb.Item>
          <Breadcrumb.Item href={url}>
            {broadcastId}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {formatMacro(macro)}
          </Breadcrumb.Item>
        </Breadcrumb>
        <MessageList broadcastId={broadcastId} macro={macro} table />
      </Grid>
    );
  }
}

BroadcastReplyList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      broadcastId: PropTypes.string.isRequired,
      macro: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BroadcastReplyList;
