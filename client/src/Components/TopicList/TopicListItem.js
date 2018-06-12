import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopicListItem = (props) => {
  const topic = props.topic;
  const topicId = topic.id;
  const url = `/topics/${topicId}`;

  return (
    <tr key={topicId}>
      <td>
        <Link to={url}>{topicId}</Link>
      </td>
      <td>{topic.type}</td>
      <td>{topic.campaign ? topic.campaign.id : null}</td>
    </tr>
  );
};

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired,
};

export default TopicListItem;
