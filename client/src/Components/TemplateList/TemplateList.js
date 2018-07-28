import React from 'react';
import PropTypes from 'prop-types';
import TemplateListItem from './TemplateListItem';

const TemplateList = (props) => {
  const templates = props.templates;
  const templateNames = Object.keys(templates);
  const topicTemplates = templateNames.map((templateName) => {
    const data = templates[templateName];
    return <TemplateListItem key={templateName} name={templateName} data={data} />;
  });
  return <div>{topicTemplates}</div>;
};

TemplateList.propTypes = {
  templates: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

TemplateList.defaultProps = {
  templates: {},
};

export default TemplateList;
