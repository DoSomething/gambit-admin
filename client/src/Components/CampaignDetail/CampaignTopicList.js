import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicLink from '../TopicLink';
import HttpRequest from '../HttpRequest';
import helpers from '../../helpers';

const CampaignTopicList = (props) => (
  <HttpRequest path={helpers.getTopicsByCampaignIdPath(props.campaignId)}>
    {(res) => {
      if (!res.data.length) {
        return <p>No results found.</p>;
      }
      return (
        <Table>
          <tbody>
            {res.data.map(topic => (
              <Row componentClass="tr" key={topic.id}>
                <Col componentClass="td"><TopicLink topic={topic} /></Col>
              </Row>
            ))}
          </tbody>
        </Table>
      );
    }}
  </HttpRequest>
);

CampaignTopicList.propTypes = {
  campaignId: PropTypes.number.isRequired,
};

export default CampaignTopicList;
