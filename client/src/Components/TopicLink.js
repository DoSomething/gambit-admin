import React from 'react';
import { Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {String} type
 */
function getLabel(topic) {
  if (topic.type === 'photoPostConfig' || topic.__typename === 'PhotoPostTopic') {
    return <Label bsStyle="primary">photo</Label>;
  } else if (topic.type === 'textPostConfig' || topic.__typename === 'TextPostTopic') {
    return <Label bsStyle="info">text</Label>;
  }
  return null;
}

const TopicLink = (props) => {
  const topic = props.topic;
  return (
    <Link to={`/topics/${topic.id}`}>{topic.name} {getLabel(topic)}</Link>
  );
};

TopicLink.propTypes = {
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TopicLink;
