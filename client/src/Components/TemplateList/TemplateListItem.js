import React from 'react';
import PropTypes from 'prop-types';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

const TemplateListItem = (props) => {
  const data = props.data;
  let suffix = '';
  if (data.override) {
    suffix = '**';
  }
  const name = props.name;
  const text = props.data.rendered || props.data.text;
  let topic = null;
  const topicId = props.data.topic.id;
  if (topicId) {
    const link = <Link to={`topic/${topicId}`}>{props.data.topic.name}</Link>;
    topic = <Panel.Footer>Changes topic to {link}</Panel.Footer>;
  }
  return (
    <Panel id={name} key={name}>
      <Panel.Heading>
        <ScrollableAnchor id={name}>
          <Panel.Title componentClass="h3">
            <a href={`#${name}`}>{name}{suffix}</a>
          </Panel.Title>
        </ScrollableAnchor>
      </Panel.Heading>
      <Panel.Body>
        {text}
      </Panel.Body>
      {topic}
    </Panel>
  );
};

TemplateListItem.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  name: PropTypes.string.isRequired,
};

export default TemplateListItem;
