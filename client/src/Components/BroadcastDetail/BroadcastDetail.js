import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TemplateListItem from '../TemplateList/TemplateListItem';
import ContentfulLink from '../ContentfulLink';
import BroadcastWebhook from './BroadcastWebhook';

const helpers = require('../../helpers');

function percent(value, total) {
  const result = ((value / total) * 100).toFixed(1);
  return `${result}%`;
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
  const totalReplyCount = stats.outbound.total;

  const data = Object.keys(stats.inbound.macros).map((macro) => {
    const currentMacroCount = macros[macro];
    return (
      <MacroStats
        key={macro}
        name={macro}
        label={macro}
        count={currentMacroCount}
        total={totalReplyCount}
      />
    );
  });

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
  if (!stats) {
    return null;
  }
  const total = stats.inbound.total;
  return (
    <div>
      <h2>Stats</h2>
      {renderStatsHeader(stats)}
      {total > 0 ? renderMacros(broadcast) : null}
    </div>
  );
}

const BroadcastDetail = (props) => {
  const broadcast = props.broadcast;
  return (
    <div>
      <PageHeader>
        <ContentfulLink entryId={broadcast.id} />
        {helpers.broadcastName(broadcast)}
      </PageHeader>
      <TemplateListItem name={broadcast.contentType} text={broadcast.text} />
      {renderStats(broadcast)}
      {broadcast.webhook ? <BroadcastWebhook config={broadcast.webhook} /> : null}
    </div>
  );
};

BroadcastDetail.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastDetail;
