import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const BroadcastWebhook = props => (
  <Panel>
    <Panel.Heading>
      <Panel.Title toggle>Settings</Panel.Title>
    </Panel.Heading>
    <Panel.Collapse>
      <Panel.Body>
        <p>
          <code>{props.config.url}</code>
        </p>
        <pre>
          <code>{JSON.stringify(props.config.body, null, 2)}</code>
        </pre>
      </Panel.Body>
    </Panel.Collapse>
  </Panel>
);

BroadcastWebhook.propTypes = {
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastWebhook;
