import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Grid } from 'react-bootstrap';
import MessageList from '../MessageList/MessageListContainer';

function formatMacro(macro) {
  if (macro === 'confirmedCampaign') {
    return 'Yes';
  }
  if (macro === 'declinedCampaign') {
    return 'No';
  }
  if (macro === 'subscriptionStatusStop') {
    return 'Unsubscribe';
  }
  return 'Other';
}

class BroadcastReplyList extends React.Component {
  constructor(props) {
    super(props);

    this.broadcastId = this.props.match.params.broadcastId;
    this.macro = this.props.match.params.macro;
  }

  render() {
    const url = `/broadcasts/${this.broadcastId}`;
    return (
      <Grid>
        <Breadcrumb>
          <Breadcrumb.Item href="/broadcasts">
            Broadcasts
          </Breadcrumb.Item>
          <Breadcrumb.Item href={url}>
            {this.broadcastId}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {formatMacro(this.macro)}
          </Breadcrumb.Item>
        </Breadcrumb>
        <MessageList broadcastId={this.broadcastId} macro={this.macro} table />
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
