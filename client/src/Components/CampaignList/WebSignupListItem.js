import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import ContentfulLink from '../ContentfulLink';

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
        let footer = null;
        if (topic && topic.id) {
          footer = (
            <Panel.Footer>
              Changes topic to: <Link to={`/topics/${topic.id}`}>{message.topic.name}</Link>
            </Panel.Footer>
          );
        }
        return (
          <Row>
            <Col>
              <Panel>
                <Panel.Heading>
                  <ContentfulLink entryId={campaignConfigId} bsSize="small" displayRefresh={false} />
                  <Link to={campaignUrl}><h4>{res.title} ({campaignId})</h4></Link>
                </Panel.Heading>
                <Panel.Body>
                  <p>{message.text}</p>
                </Panel.Body>
                {footer}
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
