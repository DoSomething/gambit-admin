import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopicListItem = (props) => {
  const topic = props.topic;
  const topicId = topic.id;
  let campaignCell = null;
  let postTypeWidth = 2;
  if (props.displayCampaign) {
    postTypeWidth = 1;
    if (!topic.campaign) {
      return null;
    }
    const campaignId = topic.campaign.id;
    campaignCell = (
      <Col md={1} componentClass="td">
        <Link to={`/campaigns/${campaignId}`}>{campaignId}</Link>
      </Col>
    );
  }
  return (
    <Row componentClass="tr" key={topicId}>
      {campaignCell}
      <Col componentClass="td" md={postTypeWidth}>{topic.postType}</Col>
      <Col componentClass="td" md={6}>
        <Link to={`/topics/${topicId}`}>{topic.name}</Link>
      </Col>
      <Col componentClass="td" md={4}>{topic.triggers ? topic.triggers.join(', ') : null}</Col>
    </Row>
  );
};

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  displayCampaign: PropTypes.bool.isRequired,
};

export default TopicListItem;
