import React from 'react';
import PropTypes from 'prop-types';
import TemplateListItem from './TemplateListItem';

const TemplateList = (props) => {
  const topicTemplates = props.templates.map((templateName) => (
    <TemplateListItem
      key={templateName}
      name={templateName}
      text={props.topic[templateName]}
      topic={props.topic[`${templateName}Topic`]}
    />
  ));
  return <div>{topicTemplates}</div>;
};

TemplateList.propTypes = {
  templates: PropTypes.array,
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

TemplateList.defaultProps = {
  templates: []
};

export default TemplateList;
