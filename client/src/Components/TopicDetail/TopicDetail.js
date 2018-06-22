import React from 'react';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicTemplate from './TopicTemplate';
import ContentfulLink from '../ContentfulLink';

function renderTemplates(templates) {
  if (!templates) {
    return <div>No templates found.</div>;
  }
  const templateNames = Object.keys(templates);
  return templateNames.map((templateName) => {
    const data = templates[templateName];
    return <TopicTemplate key={templateName} name={templateName} data={data} />;
  });
}

const TopicDetail = (props) => {
  const topic = props.topic;
  const postType = topic.postType;
  const campaignId = topic.campaign ? topic.campaign.id : '--';
  /* eslint-disable max-len */
  const description = <p>Creates signups and <strong>{postType}</strong> posts for campaign <strong>{campaignId}</strong>.</p>;
  /* eslint-enable max-len */
  return (
    <Grid>
      <PageHeader>{topic.name}</PageHeader>
      <Panel>
        <Panel.Body>
          <p>{description}</p>
          <p><strong>Triggers:</strong> {topic.triggers.join(', ')}</p>
          <ContentfulLink entryId={topic.id} />
        </Panel.Body>
      </Panel>
      {renderTemplates(topic.templates)}
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
