import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

/**
 * @param {Number} value
 * @param {Number} total
 * @return {String}
 */
function formatPercentage(value, total) {
  const result = ((value / total) * 100).toFixed(1);
  return `${result}%`;
}

const BroadcastStats = ({ stats }) => {
  const header = <h2>Stats</h2>;

  if (stats.outbound.total === 0) {
    return (
      <div>
        {header}
        <p>No outbound messages found.</p>
      </div>
    );
  }

  return (
    <div>
      {header}
      <h4>
        Sent <strong>{stats.outbound.total.toLocaleString()}</strong> messages, received <strong>{stats.inbound.total.toLocaleString()}</strong> responses. <small>{formatPercentage(stats.inbound.total, stats.outbound.total)}</small>
      </h4>
      <Table striped>
        <tbody>
          {Object.keys(stats.inbound.macros).sort().map((macro) => {
            const currentMacroCount = stats.inbound.macros[macro];
            const url = `${window.location.pathname}/${macro}`;
            return (
              <tr key={macro}>
                <td>
                  <Link to={url}>
                    {macro}
                  </Link>
                </td>
                <td>
                  <Link to={url}>
                    {currentMacroCount.toLocaleString()}
                  </Link>
                </td>
                <td>
                  <Link to={url}>
                    {formatPercentage(currentMacroCount, stats.outbound.total)}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

BroadcastStats.propTypes = {
  stats: PropTypes.shape({
    inbound: PropTypes.object,
    outbound: PropTypes.object,
  }).isRequired,
};

export default BroadcastStats;
