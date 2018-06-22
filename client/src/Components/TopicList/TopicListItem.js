import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopicListItem = (props) => {
  const topic = props.topic;
  const topicId = topic.id;
  const url = `/topics/${topicId}`;
  let campaignCell = null;
  if (topic.campaign) {
    campaignCell = <td>{topic.campaign.id}</td>;
  }
  return (
    <tr key={topicId}>
      <td>
        <Link to={url}>{topic.name}</Link>
      </td>
      <td>{topic.triggers ? topic.triggers.join(', ') : null}</td>
      <td>{topic.postType}</td>
      {campaignCell}
    </tr>
  );
};

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TopicListItem;
