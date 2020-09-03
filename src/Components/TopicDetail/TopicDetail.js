import React from 'react';
import { Panel, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicTemplates from './TopicTemplates';
import CampaignLink from '../CampaignLink';
import ContentfulLink from '../ContentfulLink';

const TopicDetail = ({ topic }) => (
  <div>
    <PageHeader>{topic.name} <small><br />{topic.__typename}</small></PageHeader>
    <Panel>
      <Panel.Body>
        <ContentfulLink entryId={topic.id} />
        <p>
          {topic.campaign
            ? <CampaignLink campaign={topic.campaign} linkDisabled={false} />
            : <span>(None)</span>}
        </p>
      </Panel.Body>
    </Panel>
    <TopicTemplates topic={topic} />
  </div>
);

TopicDetail.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string,
    __typename: PropTypes.string,
    name: PropTypes.string,
    campaign: PropTypes.object,
  }).isRequired,
};

export default TopicDetail;
