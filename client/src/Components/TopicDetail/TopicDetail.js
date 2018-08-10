import React from 'react';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TemplateList from '../TemplateList/TemplateList';
import ContentfulLink from '../ContentfulLink';

/**
  * TODO: Move into a TopicSummary component.
  * @param {Object} topic
  */
function getSummary(topic) {
  if (!topic.campaign) {
    return null;
  }

  const campaign = topic.campaign;
  let postInfo = null;
  if (topic.type === 'textPostConfig') {
    postInfo = ' and text posts';
  } else if (topic.type === 'photoPostConfig') {
    postInfo = ' and photo posts';
  }
  const campaignLink = <Link to={`/campaigns/${campaign.id}`}>{campaign.title}</Link>;

  return (
    <p>
     Creates signups{postInfo} for <strong>{campaignLink}</strong>.
    </p>
  );
}

/**
 * @param {Object} topic
 */
function getTriggers(topic) {
  const hasTriggers = topic.triggers.length;
  return hasTriggers ? <p><strong>Keywords:</strong> {topic.triggers.join(', ')}</p> : null;
}

const TopicDetail = (props) => {
  const topic = props.topic;
  return (
    <Grid>
      <PageHeader>{topic.name}</PageHeader>
      <Panel>
        <Panel.Body>
          {getSummary(topic)}
          {getTriggers(topic)}
          <ContentfulLink entryId={topic.id} />
        </Panel.Body>
      </Panel>
      <TemplateList templates={topic.templates} />
    </Grid>
  );
};

TopicDetail.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    postType: PropTypes.string,
    templates: PropTypes.object,
  }).isRequired,
};

export default TopicDetail;
