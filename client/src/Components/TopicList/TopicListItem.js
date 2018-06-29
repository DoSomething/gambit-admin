import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopicListItem = (props) => {
  const topic = props.topic;
  const topicId = topic.id;
  let campaignCell = null;
  if (props.displayCampaign) {
    const campaignId = topic.campaign.id;
    campaignCell = <Col md={1}><Link to={`/campaigns/${campaignId}`}>{campaignId}</Link></Col>;
  }
  return (
    <tr><td>
      <Row key={topicId}>
        {campaignCell}
        <Col md={1}>{topic.postType}</Col>
        <Col md={6}>
          <Link to={`/topics/${topicId}`}>{topic.name}</Link>
        </Col>
        <Col md={4}>{topic.triggers ? topic.triggers.join(', ') : null}</Col>

      </Row>
    </td></tr>
  );
};

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  displayCampaign: PropTypes.bool.isRequired,
};

export default TopicListItem;
