import React from 'react';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';

import TemplateList from '../TemplateList/TemplateList';
import CampaignLink from '../CampaignLink';
import ContentfulLink from '../ContentfulLink';

const TopicDetail = (props) => {
  const topic = props.topic;
  const campaignTitle = topic.campaign ? <CampaignLink campaign={topic.campaign} linkDisabled={false} /> : '(None)';
  return (
    <Grid>
      <PageHeader>{topic.name}</PageHeader>
      <Panel>
        <Panel.Body>
          <ContentfulLink entryId={topic.id} />
          <p>
            Campaign: {campaignTitle}
          </p>
        </Panel.Body>
      </Panel>
      <TemplateList templates={topic.templates} />
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
