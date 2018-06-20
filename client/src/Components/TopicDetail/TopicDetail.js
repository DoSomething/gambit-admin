import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
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
  const editLink = <small><Link to="/">edit</Link></small>;
  const campaignId = topic.campaign.id;
  return (
    <Grid>
      <PageHeader>{topic.name} <small>{editLink}</small></PageHeader>
      <Panel>
        <Panel.Body>Creates <strong>{topic.postType}</strong> posts for campaign <strong>{campaignId}</strong>.</Panel.Body>
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