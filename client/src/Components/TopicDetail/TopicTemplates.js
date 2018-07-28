import React from 'react';
import PropTypes from 'prop-types';
import TopicTemplate from './TopicTemplate';

const TopicTemplates = (props) => {
  const templates = props.templates;
  const templateNames = Object.keys(templates);
  const topicTemplates = templateNames.map((templateName) => {
    const data = templates[templateName];
    return <TopicTemplate key={templateName} name={templateName} data={data} />;
  });
  return <div>{topicTemplates}</div>;
};

TopicTemplates.propTypes = {
  templates: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

TopicTemplates.defaultProps = {
  templates: {},
};

export default TopicTemplates;
