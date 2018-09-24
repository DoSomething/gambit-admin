import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HttpRequest from '../HttpRequest';
import ContentfulLink from '../ContentfulLink';
import PropTypes from 'prop-types';

const WebSignupListItem = (props) => {
  const data = props.data.raw;
  const campaignConfigId = data.sys.id;
  const campaignId = data.fields.campaignId;
  const campaignUrl = `campaigns/${campaignId}`;
  return (
    <HttpRequest path={campaignUrl}>
      {(res) => {
        const message = res.config.templates.webSignup;
        const topic = message.topic;
        return (
          <Row>
            <Col>
              <Panel>
                <Panel.Heading>
                  <Link to={campaignUrl}>{res.title} ({campaignId})</Link>
                </Panel.Heading>
                <Panel.Body>
                  <p><strong>Message:</strong> {message.text}</p>
                  <p>
                    <strong>Topic:</strong> <Link to={`/topics/${topic.id}`}>{message.topic.name}</Link>
                  </p>
                  <ContentfulLink entryId={campaignConfigId} bsSize="small" displayRefresh={false} />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        );
      }}
    </HttpRequest>
  );
};

WebSignupListItem.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WebSignupListItem;
