import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicTemplate from './TopicTemplate';


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
  const url = `https://app.contentful.com/spaces/owik07lyerdj/entries/${topic.id}`;
  const campaignId = topic.campaign ? topic.campaign.id : '--';
  return (
    <Grid>
      <PageHeader>{topic.name}</PageHeader>
      <Panel>
        <Panel.Body>
          <p>
            Creates <strong>{postType}</strong> posts for campaign <strong>{campaignId}</strong>.
          </p>
          <p>
            <Button href={url} target="_blank">Edit in Contentful</Button>
          </p>
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
