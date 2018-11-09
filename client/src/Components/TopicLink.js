import React from 'react';
import { Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {String} postType
 */
function getPostTypeLabel(postType) {
  if (postType === 'photo') {
    return <Label bsStyle="primary">photo</Label>;
  } else if (postType === 'text') {
    return <Label bsStyle="info">text</Label>;
  }
  return null;
}

const TopicLink = (props) => {
  const topic = props.topic;
  return (
    <Link to={`/topics/${topic.id}`}>{topic.name} {getPostTypeLabel(topic.postType)}</Link>
  );
};

TopicLink.propTypes = {
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TopicLink;
