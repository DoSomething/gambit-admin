import React from 'react';
import { Col, Panel, Grid, PageHeader, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicTemplate from './TopicTemplate';

function topicInfo(topic) {
  return (
    <Panel>
      <Row>
        <Col sm={6}>
          <strong>Type:</strong> {topic.type}
        </Col>
        <Col sm={6}>
          <strong>Campaign:</strong> {topic.campaign ? topic.campaign.id : null}
        </Col>
      </Row>
    </Panel>
  );
}

function topicTemplates(templates) {
  if (!templates) {
    return <div>No templates found.</div>;
  }
  const templateNames = Object.keys(templates);
  const rows = templateNames.map((templateName) => {
    const data = templates[templateName];
    return <TopicTemplate key={templateName} name={templateName} data={data} />;
  });
  return (
    <Grid>
      {rows}
    </Grid>
  );
}

const TopicDetail = (props) => {
  const topic = props.topic;
  return (
    <Grid>
      <PageHeader>{topic.id}</PageHeader>
      {topicInfo(topic)}
      {topicTemplates(topic.templates)}
    </Grid>
  );
};

TopicDetail.propTypes = {
  // Browser is complaining about setting this to shape, which is why line below is disabling lint
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TopicDetail;
