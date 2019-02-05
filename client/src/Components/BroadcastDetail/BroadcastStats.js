import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

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
 * @param {object} stats
 */
function renderMacros(stats) {
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

const BroadcastStats = ({ stats }) => {
  const header = <h2>Stats</h2>;
  const totalOutbound = stats.outbound.total;
  if (totalOutbound === 0) {
    return (
      <div>
        {header}
        <p>No messages found.</p>
      </div>
    );
  }
  const totalInboundStr = <strong>{stats.inbound.total.toLocaleString()}</strong>;
  const totalOutboundStr = <strong>{totalOutbound.toLocaleString()}</strong>;
  const rate = percent(stats.inbound.total, totalOutbound);
  return (
    <div>
      <h2>Stats</h2>
      <h4>
        Sent {totalOutboundStr} messages, received {totalInboundStr} responses. <small>{rate}</small>
      </h4>
      {totalOutbound > 0 ? renderMacros(stats) : null}
    </div>
  );
};

BroadcastStats.propTypes = {
  stats: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastStats;
