import React from 'react';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';

import TemplateList from '../TemplateList/TemplateList';
import CampaignLink from '../CampaignLink';
import ContentfulLink from '../ContentfulLink';

const getTemplates = (topic) => {
  const type = topic.__typename;

  if (type === 'AutoReplyTopic' || type === 'AutoReplySignupTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={['autoReply']} 
      />
    );
  }

  if (type === 'TextPostTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={['invalidText', 'completedTextPost']} 
      />
    );
  }

  if (type === 'PhotoPostTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={[
          'startPhotoPostAutoReply',
          'askQuantity',
          'invalidQuantity',
          'askPhoto',
          'invalidPhoto',
          'askCaption',
          'invalidCaption',
          'askWhyParticipated',
          'invalidWhyParticipated',
          'completedPhotoPost',
          'completedPhotoPostAutoReply',
        ]} 
      />
    );
  }

  return null;
}

const TopicDetail = (props) => {
  const topic = props.topic;
  const campaignTitle = topic.campaign ? <CampaignLink campaign={topic.campaign} linkDisabled={false} /> : '(None)';
  return (
    <Grid>
      <PageHeader>{topic.name} <small><br />{topic.__typename}</small></PageHeader>
      <Panel>
        <Panel.Body>
          <ContentfulLink entryId={topic.id} />
          <p>
            {campaignTitle}
          </p>
        </Panel.Body>
      </Panel>
      {getTemplates(topic)}
    </Grid>
  );
};

TopicDetail.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    postType: PropTypes.string,
    templates: PropTypes.object,
  }).isRequired,
};

export default TopicDetail;
