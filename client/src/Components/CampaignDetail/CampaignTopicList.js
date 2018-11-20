import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicLink from '../TopicLink';
import HttpRequest from '../HttpRequest';
import helpers from '../../helpers';

const CampaignTopicListContainer = (props) => {
  const contentfulQuery = {
    content_type: props.topicType,
    'fields.campaign.sys.id': props.campaign.config.id,
  };

  return (
    <HttpRequest path={helpers.getContentfulEntriesPath()} query={contentfulQuery}>
      {(res) => {
        if (!res.length) {
          return <p>No results found.</p>;
        }
        return (
          <Table>
            <tbody>
              {res.map((entry) => {
                const topic = entry.parsed;
                return (
                  <Row componentClass="tr" key={topic.id}>
                    <Col componentClass="td"><TopicLink topic={topic} /></Col>
                  </Row>
                );
              })}
            </tbody>
          </Table>
        );
      }}
    </HttpRequest>
  );
};

CampaignTopicListContainer.propTypes = {
  campaign: PropTypes.shape({
    config: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  topicType: PropTypes.string.isRequired,
};

export default CampaignTopicListContainer;
