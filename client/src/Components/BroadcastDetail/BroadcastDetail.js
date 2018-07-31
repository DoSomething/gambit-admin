import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Col, PageHeader, Panel, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TemplateList from '../TemplateList/TemplateList';
import TemplateListItem from '../TemplateList/TemplateListItem';
import ContentfulLink from '../ContentfulLink';

const helpers = require('../../helpers');

function percent(value, total) {
  const result = ((value / total) * 100).toFixed(1);
  return `${result}%`;
}

function renderRow(label, data) {
  return (
    <Row componentClass="div">
      <Col componentClass="p" sm={2}><strong>{label}</strong></Col>
      <Col sm={10}>{data}</Col>
    </Row>
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
        key={macro}
        name={macro}
        label={macro}
        count={currentMacroCount}
        total={totalReplyCount}
      />
    );
  });

  const otherKey = 'other';
  data.push(<MacroStats
    key={otherKey}
    name={otherKey}
    label={otherKey}
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
  const campaignId = broadcast.campaignId;
  let description = null;
  if (campaignId) {
    const campaignLink = `/campaigns/${campaignId}`;
    description = (
      <p>
        This broadcast is for campaign <Link to={campaignLink}>{campaignId}</Link>.
      </p>
    );
  }
  const templateValue = broadcast.message.template;
  const templateName = templateValue === 'rivescript' ? '' : templateValue;

  return (
    <div>
      <PageHeader>{helpers.broadcastName(broadcast)}</PageHeader>
      <Panel>
        <Panel.Body>
          {description}
          <p>
            Created <strong><Moment format="MMM D, YYYY">{broadcast.createdAt}</Moment></strong>
          </p>
          <ContentfulLink entryId={broadcast.id} />
        </Panel.Body>
      </Panel>
      <TemplateListItem name={templateName} data={broadcast.message} />
      <TemplateList templates={broadcast.templates} />
      <h2>Stats</h2>
      {renderStats(broadcast)}
      <h2>Settings</h2>
      {renderRow('URL', broadcast.webhook.url)}
      {renderRow('Body', <pre><code>{broadcast.webhookBody}</code></pre>)}
    </div>
  );
};

BroadcastDetail.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastDetail;
