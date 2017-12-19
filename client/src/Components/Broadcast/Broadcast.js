import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Col, ControlLabel, Form, FormGroup, FormControl, Grid, PageHeader, Tab, Tabs, Table, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MessageList from '../MessageList/MessageListContainer';

const queryString = require('query-string');
const helpers = require('../../helpers');

function percent(value, total) {
  const result = ((value / total) * 100).toFixed(1);
  return `${result}%`;
}

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
  const rate = percent(data, total);
  return (
    <tr>
      <td>{label}</td>
      <td>{data.toLocaleString()}</td>
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
  const rate = percent(data.inbound.total, totalOutbound);
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

function renderNav(broadcast) {
  const queryParams = queryString.parse(window.location.search);
  let defaultActiveKey = 0;
  if (queryParams.skip) {
    defaultActiveKey = 1;
  }
  return (
    <Tabs defaultActiveKey={defaultActiveKey} animation={false} id="broadcast-tabs">
      <Tab eventKey={0} title="Details"><br />
        <Form horizontal>
          {broadcast.context}
          {renderRow('Created', <Moment format="MMM D, YYYY">{broadcast.createdAt}</Moment>)}
          {renderRow('Text', broadcast.message)}
        </Form>
        <h2>Stats</h2>
        {renderStats(broadcast)}
        <h2>Settings</h2>
        <Form horizontal>
          {renderRow('URL', broadcast.webhook.url)}
          {renderRow('Body', <pre><code>{broadcast.webhookBody}</code></pre>)}
        </Form>
      </Tab>
      <Tab eventKey={1} title="Yes"><br />
        <MessageList broadcastId={broadcast.id} macro="confirmedCampaign" table />
      </Tab>
      <Tab eventKey={2} title="No"><br />
        <MessageList broadcastId={broadcast.id} macro="declinedCampaign" table />
      </Tab>
      <Tab eventKey={3} title="Unsubscribe"><br />
        <MessageList broadcastId={broadcast.id} macro="subscriptionStatusStop" table />
      </Tab>
      <Tab eventKey={4} title="Other"><br />
        <MessageList broadcastId={broadcast.id} macro="other" table />
      </Tab>
    </Tabs>
  );
}

const Broadcast = (props) => {
  const broadcast = props.broadcast;
  broadcast.webhookBody = JSON.stringify(broadcast.webhook.body, null, 2);
  if (broadcast.topic) {
    broadcast.context = renderRow('Topic', broadcast.topic);
  } else {
    const campaignId = broadcast.campaignId;
    const campaignLink = `/campaigns/${campaignId}`;
    broadcast.context = renderRow('Campaign', <Link to={campaignLink}>{campaignId}</Link>);
  }
  return (
    <Grid>
      <PageHeader>{helpers.broadcastName(broadcast)}</PageHeader>
      {renderNav(broadcast)}
    </Grid>
  );
};

Broadcast.propTypes = {
  broadcast: PropTypes.shape.isRequired,
};

export default Broadcast;
