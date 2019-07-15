import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import TemplateListItem from './TemplateListItem';

const TemplateList = (props) => {
  // TODO: Move template logic to helper so the TemplateList doesn't
  // have to know anything about how to access the correct values
  const topicTemplates = props.templates.map((templateName) => (
    <TemplateListItem
      key={templateName[0]}
      name={templateName[0]}
      text={lodash.get(props.topic, templateName[1] || templateName[0]) || 'N/A'}
      topic={lodash.get(props.topic, templateName[2])}
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
