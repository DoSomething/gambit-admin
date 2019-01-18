import React from 'react';
import PropTypes from 'prop-types';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

const TemplateListItem = (props) => {
  const name = props.name;
  const topic = props.topic || {};
  const footer = topic.id
    ? (
      <Panel.Footer>
        Changes topic to <Link to={`/topics/${topic.id}`}>{topic.name}</Link>
      </Panel.Footer>
    )
    : null;

  return (
    <Panel id={name} key={name}>
      <Panel.Heading>
        <ScrollableAnchor id={name}>
          <Panel.Title componentClass="h3">
            <a href={`#${name}`}>{name}</a>
          </Panel.Title>
        </ScrollableAnchor>
      </Panel.Heading>
      <Panel.Body>
        {props.text}
      </Panel.Body>
      {footer}
    </Panel>
  );
};

TemplateListItem.propTypes = {
  topic: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TemplateListItem;
