import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Label, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Moment from 'react-moment';

const helpers = require('../../helpers');
const config = require('../../config');

function getLabelWithQueuedTimeTooltip(label, deliveryMetadata) {
  const deliveredAt = helpers.message.outbound.getDeliveredAtDate(deliveryMetadata);
  const queuedAt = helpers.message.outbound.getQueuedAtDate(deliveryMetadata);
  const tooltip = (
    <Tooltip id="queued-for">
      Queued for {' '}
      <Moment from={deliveredAt} ago>
        {queuedAt}
      </Moment>
    </Tooltip>
  );
  const labelWithTooltip = (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      { label }
    </OverlayTrigger>
  );

  return labelWithTooltip;
}

function getLabelItem(status, style, url) {
  const label = <Label bsStyle={style}>{ status }</Label>;
  if (url) {
    return <a target="_blank" rel="noopener noreferrer" href={url}>{ label }</a>;
  }
  return label;
}

function getDateItem(date, url) {
  const dateFormat = config.dateFormat;
  const dateItem = <Moment format={dateFormat}>{ date }</Moment>;
  if (url) {
    return <Link to={url}>{ dateItem }</Link>;
  }
  return dateItem;
}

function renderDate(message, isInbound) {
  const defaultDate = message.createdAt;
  const metadata = message.metadata || false;
  const dateLinkTo = metadata ? `/requests/${metadata.requestId}` : false;

  let messageDate;
  if (isInbound) {
    messageDate = getDateItem(defaultDate, dateLinkTo);
  } else {
    let labelItem;
    const {
      status, date, labelText, labelStyle, errorLink: labelLinkTo,
    } = helpers.message.outbound.getDeliveryDisplaySettings(message);

    labelItem = getLabelItem(labelText, labelStyle, labelLinkTo);

    if (helpers.message.outbound.isDeliveredStatus(status)) {
      const deliveryMetadata = helpers.message.getDeliveryMetadata(message);
      labelItem = getLabelWithQueuedTimeTooltip(labelItem, deliveryMetadata);
    }
    const dateItem = getDateItem(date, dateLinkTo);
    messageDate = (
      <div>
        { dateItem }{' '}
        { labelItem }
      </div>
    );
  }

  return messageDate;
}

const MessageListItem = (props) => {
  const message = props.message;
  const isInbound = props.isInbound;
  return renderDate(message, isInbound);
};

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isInbound: PropTypes.bool.isRequired,
};

export default MessageListItem;
