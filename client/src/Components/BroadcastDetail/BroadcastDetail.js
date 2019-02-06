import React from 'react';
import { PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TemplateListItem from '../TemplateList/TemplateListItem';
import ContentfulLink from '../ContentfulLink';
import BroadcastStats from './BroadcastStatsContainer';
import TopicTemplates from '../TopicDetail/TopicTemplates';

const BroadcastDetail = ({ broadcast }) => (
  <div>
    <PageHeader>
      <ContentfulLink entryId={broadcast.id} />
      {broadcast.name}
    </PageHeader>
    <TemplateListItem
      name={broadcast.contentType}
      text={broadcast.text}
      topic={broadcast.topic} 
     />
    <TopicTemplates topic={broadcast} />
    <BroadcastStats broadcastId={broadcast.id} />
  </div>
);

BroadcastDetail.propTypes = {
  broadcast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BroadcastDetail;
