import React from 'react';
import { Col, Label, Row } from 'react-bootstrap';
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

/**
 * @param {Object} campaign
 */
function getCampaignLink(campaign) {
  return (
    <Link to={`/campaigns/${campaign.id}`}>{campaign.title} ({campaign.id})</Link>
  );
}

const TopicListItem = (props) => {
  const topic = props.topic;
  return (
    <Row componentClass="tr" key={topic.id}>
      <Col componentClass="td" md={5}>
        <Link to={`/topics/${topic.id}`}>{topic.name}</Link> {getPostTypeLabel(topic.postType)}
      </Col>
      <Col componentClass="td" md={5}>
        {props.displayCampaign && !!topic.campaign ? getCampaignLink(topic.campaign) : null}
      </Col>
      <Col componentClass="td" md={2}>{topic.triggers ? topic.triggers.join(', ') : null}</Col>
    </Row>
  );
};

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  displayCampaign: PropTypes.bool.isRequired,
};

export default TopicListItem;
