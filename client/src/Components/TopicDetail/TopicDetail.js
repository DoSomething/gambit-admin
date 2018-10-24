import React from 'react';
import { Panel, Grid, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TemplateList from '../TemplateList/TemplateList';
import ContentfulLink from '../ContentfulLink';
import helpers from '../../helpers';

/**
 * @param {Object} topic
 */
function getTriggers(topic) {
  return <p><strong>Keywords:</strong> {topic.triggers.join(', ')}</p>;
}

const TopicDetail = (props) => {
  const topic = props.topic;
  const html = helpers.getTopicDescription(topic);
  const summary = (
    <span
      dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
    />
  );

  return (
    <Grid>
      <PageHeader>{topic.name}</PageHeader>
      <Panel>
        <Panel.Body>
          <ContentfulLink entryId={topic.id} />
          <p>
            This topic {summary}.
          </p>
          {topic.triggers.length ? getTriggers(topic) : null}

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
