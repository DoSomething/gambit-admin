import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const BroadcastWebhook = ({ broadcastId, url }) => (
  <Panel>
    <Panel.Heading>
      <Panel.Title toggle>Settings</Panel.Title>
    </Panel.Heading>
    <Panel.Collapse>
      <Panel.Body>
        <p>
          <code>{url}</code>
        </p>
        <pre>
          <code>{`{
  "broadcastId": "${broadcastId}",
  "userId": "{{customer.id}}",
  "addrState": {% if customer.addr_state != blank %}"{{customer.addr_state}}"{% else %}null{% endif %},
  "mobile": "{{customer.phone}}",
  "smsStatus": "{{customer.sms_status}}"
}`}</code>
        </pre>
      </Panel.Body>
    </Panel.Collapse>
  </Panel>
);

BroadcastWebhook.propTypes = {
  url: PropTypes.string.isRequired,
  broadcastId: PropTypes.string.isRequired,
};

export default BroadcastWebhook;
