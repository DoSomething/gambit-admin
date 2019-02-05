import React from 'react';
import { PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TemplateListItem from '../TemplateList/TemplateListItem';
import ContentfulLink from '../ContentfulLink';
import BroadcastStatsContainer from './BroadcastStats';
import BroadcastWebhook from './BroadcastWebhook';
import TopicTemplates from '../TopicDetail/TopicTemplates';

const helpers = require('../../helpers');

const BroadcastDetail = ({ broadcast }) => (
  <div>
    <PageHeader>
      <ContentfulLink entryId={broadcast.id} />
      {broadcast.name}
    </PageHeader>
    <TemplateListItem name={broadcast.contentType} text={broadcast.text} />
    <TopicTemplates topic={broadcast} />
  </div>
);

BroadcastDetail.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastDetail;
