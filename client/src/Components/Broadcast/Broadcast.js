import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function renderRow(label, data) {
  return (
    <FormGroup>
      <Col sm={2}><ControlLabel>{label}</ControlLabel></Col>
      <Col sm={10}><FormControl.Static>{data}</FormControl.Static></Col>
    </FormGroup>
  );
}

const Broadcast = (data) => {
  const webhook = data.broadcast.webhook;
  const webhookBody = JSON.stringify(webhook.body, null, 2);

  return (
    <div>
      <Form horizontal>
        {renderRow('Campaign', data.broadcast.campaign.campaignId)}
        {renderRow('Message', data.broadcast.broadcast.message)}
      </Form>
      <h3>Customer.io settings</h3>
      <Form horizontal>
        {renderRow('URL', <code>{webhook.url}</code>)}
        {renderRow('Body', <code>{webhookBody}</code>)}
      </Form>
    </div>
  );
};

export default Broadcast;
