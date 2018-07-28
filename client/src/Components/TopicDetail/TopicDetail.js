import React from 'react';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TemplateList from '../TemplateList/TemplateList';
import ContentfulLink from '../ContentfulLink';


const TopicDetail = (props) => {
  const topic = props.topic;
  const postType = topic.postType;
  const campaignId = topic.campaign ? topic.campaign.id : '--';
  const campaignLink = (
    <Link to={`/campaigns/${campaignId}`}>campaign <strong>{campaignId}</strong></Link>
  );

  return (
    <Grid>
      <PageHeader>{topic.name}</PageHeader>
      <Panel>
        <Panel.Body>
          <p>Creates signups and <strong>{postType}</strong> posts for {campaignLink}.</p>
          <p><strong>Triggers:</strong> {topic.triggers.join(', ')}</p>
          <ContentfulLink entryId={topic.id} />
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
