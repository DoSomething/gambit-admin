import React from 'react';
import { Link } from 'react-router-dom';
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
  const broadcast = data.broadcast;
  const webhook = broadcast.webhook;
  const webhookBody = JSON.stringify(webhook.body, null, 2);
  const campaignId = broadcast.campaign.campaignId;
  const campaignLink = `/campaigns/${campaignId}`;

  return (
    <div>
      <Form horizontal>
        {renderRow('Campaign', <Link to={campaignLink}>{campaignId}</Link>)}
        {renderRow('Message', broadcast.broadcast.message)}
      </Form>
      <h3>Customer.io settings</h3>
      <Form horizontal>
        {renderRow('URL', webhook.url)}
        {renderRow('Body', <code>{webhookBody}</code>)}
      </Form>
    </div>
  );
};

export default Broadcast;
