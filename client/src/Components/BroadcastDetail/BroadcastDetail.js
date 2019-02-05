import React from 'react';
import { PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TemplateListItem from '../TemplateList/TemplateListItem';
import ContentfulLink from '../ContentfulLink';
import BroadcastStats from './BroadcastStats';
import BroadcastWebhook from './BroadcastWebhook';

const helpers = require('../../helpers');

const BroadcastDetail = ({ broadcast }) => (
  <div>
    <PageHeader>
      <ContentfulLink entryId={broadcast.id} />
      {helpers.broadcastName(broadcast)}
    </PageHeader>
    <TemplateListItem name={broadcast.contentType} text={broadcast.text} />
    {broadcast.stats ? <BroadcastStats stats={broadcast.stats} /> : null}
    {broadcast.webhook ? <BroadcastWebhook config={broadcast.webhook} /> : null}
  </div>
);

BroadcastDetail.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastDetail;
