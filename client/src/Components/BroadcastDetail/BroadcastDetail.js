import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Col, ControlLabel, Form, FormGroup, FormControl, PageHeader, Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ContentfulLink from '../ContentfulLink';

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
function MacroStats({ name, label, count, total }) {
  let data = count;
  let url = `${window.location.pathname}/${name}`;
  if (!count) {
    data = 0;
    url = '#';
  }
  const rate = percent(data, total);

  return (
    <tr>
      <td><Link to={url}>{label}</Link></td>
      <td><Link to={url}>{data.toLocaleString()}</Link></td>
      <td><Link to={url}>{rate}</Link></td>
    </tr>
  );
}

MacroStats.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

/**
 * @param {object} broadcast
 */
function renderMacros(broadcast) {
  const stats = broadcast.stats;
  const macros = stats.inbound.macros;
  let macroReplyCount = 0;
  const totalReplyCount = stats.inbound.total;

  const data = Object.keys(stats.inbound.macros).map((macro) => {
    const currentMacroCount = macros[macro];
    macroReplyCount += currentMacroCount;
    return (
      <MacroStats
        name={macro}
        label={macro}
        count={currentMacroCount}
        total={totalReplyCount}
      />
    );
  });

  data.push(<MacroStats
    name="other"
    label="other"
    count={totalReplyCount - macroReplyCount}
    total={totalReplyCount}
  />);

  return (
    <Table striped>
      <tbody>
        {data}
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
      {total > 0 ? renderMacros(broadcast) : null}
    </div>
  );
}

const BroadcastDetail = (props) => {
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
    <div>
      <PageHeader>{helpers.broadcastName(broadcast)}</PageHeader>
      <Panel>
        <Panel.Body>
          <Form horizontal>
            {broadcast.context}
            {renderRow('Created', <Moment format="MMM D, YYYY">{broadcast.createdAt}</Moment>)}
            {renderRow('Text', broadcast.message)}
          </Form>
          <ContentfulLink entryId={broadcast.id} />
        </Panel.Body>
      </Panel>

      <h2>Stats</h2>
      {renderStats(broadcast)}
      <h2>Settings</h2>
      <Form horizontal>
        {renderRow('URL', broadcast.webhook.url)}
        {renderRow('Body', <pre><code>{broadcast.webhookBody}</code></pre>)}
      </Form>
    </div>
  );
};

BroadcastDetail.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastDetail;
