import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';

function renderRow(label, data) {
  return (
    <FormGroup>
      <Col sm={2}><ControlLabel>{label}</ControlLabel></Col>
      <Col sm={10}><FormControl.Static>{data}</FormControl.Static></Col>
    </FormGroup>
  );
}

const Broadcast = (props) => {
  const broadcast = props.broadcast;
  const webhook = broadcast.webhook;
  const webhookBody = JSON.stringify(webhook.body, null, 2);
  let context = null;
  if (broadcast.topic) {
    context = renderRow('Topic', broadcast.topic);
  } else {
    const campaignId = broadcast.campaignId;
    const campaignLink = `/campaigns/${campaignId}`;
    context = renderRow('Campaign', <Link to={campaignLink}>{campaignId}</Link>);
  }

  return (
    <div>
      <Form horizontal>
        {context}
        {renderRow('Message', broadcast.message)}
      </Form>
      <h3>Stats</h3>
      <Form horizontal>
        {renderRow('Outbound messages', broadcast.stats.outbound.total.toLocaleString())}
        {renderRow('Inbound messages', broadcast.stats.inbound.total.toLocaleString())}
      </Form>
      <h3>Customer.io settings</h3>
      <Form horizontal>
        {renderRow('URL', webhook.url)}
        {renderRow('Body', <pre><code>{webhookBody}</code></pre>)}
      </Form>
    </div>
  );
};

Broadcast.propTypes = {
  broadcast: PropTypes.shape.isRequired,
};

export default Broadcast;
