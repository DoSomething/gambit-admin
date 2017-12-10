import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Col, ControlLabel, Form, FormGroup, FormControl, Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const percent = require('percent');
const helpers = require('../../helpers');

function renderRow(label, data) {
  return (
    <FormGroup>
      <Col sm={2}><ControlLabel>{label}</ControlLabel></Col>
      <Col sm={10}><FormControl.Static>{data}</FormControl.Static></Col>
    </FormGroup>
  );
}

/**
 * @param {string} label
 * @param {number} count
 */
function renderMacroCount(label, count, total) {
  let data = count;
  if (!count) {
    data = 0;
  }
  const rate = percent.calc(data, total, 0, true);
  return (
    <tr>
      <td>{label}</td>
      <td>{data}</td>
      <td>{rate}</td>
    </tr>
  );
}

/**
 * @param {object} data
 */
function renderMacros(macros, total) {
  if (!macros) {
    return null;
  }
  return (
    <Table striped>
      <tbody>
        {renderMacroCount('Yes', macros.confirmedCampaign, total)}
        {renderMacroCount('No', macros.declinedCampaign, total)}
        {renderMacroCount('Unsubscribe', macros.subscriptionStatusStop, total)}
      </tbody>
    </Table>
  );
}

function renderStatsHeader(data) {
  const totalOutbound = data.outbound.total;
  if (totalOutbound === 0) {
    return <p>No messages found.</p>;
  }
  const totalInboundStr = <strong>{data.inbound.total.toLocaleString()}</strong>;
  const totalOutboundStr = <strong>{totalOutbound.toLocaleString()}</strong>;
  const rate = percent.calc(data.inbound.total, totalOutbound, 0, true);
  return (
    <h4>
      Sent {totalOutboundStr} messages, received {totalInboundStr} responses. <small>{rate}</small>
    </h4>
  );
}

/**
 * @param {object} broadcast
 */
function renderStats(broadcast) {
  const stats = broadcast.stats;
  const total = stats.inbound.total;
  return (
    <div>
      {renderStatsHeader(stats)}
      {total > 0 ? renderMacros(stats.inbound.macros, total) : null}
    </div>
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
    <Grid>
      <PageHeader>{helpers.broadcastName(broadcast)}</PageHeader>
      <Form horizontal>
        {context}
        {renderRow('Created', <Moment format="MMM D, YYYY">{broadcast.createdAt}</Moment>)}
        {renderRow('Text', broadcast.message)}
      </Form>
      <Panel header="Messages">
        {renderStats(broadcast)}
      </Panel>
      <h3>Settings</h3>
      <Form horizontal>
        {renderRow('URL', webhook.url)}
        {renderRow('Body', <pre><code>{webhookBody}</code></pre>)}
      </Form>
    </Grid>
  );
};

Broadcast.propTypes = {
  broadcast: PropTypes.shape.isRequired,
};

export default Broadcast;
