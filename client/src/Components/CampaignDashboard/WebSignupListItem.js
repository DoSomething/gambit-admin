import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import CampaignLink from '../CampaignLink';
import ContentfulLink from '../ContentfulLink';

class WebSignupListItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }
  render() {
    const data = this.props.data.raw;
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
            <Panel>
              <Panel.Heading>
                <ContentfulLink entryId={campaignConfigId} bsSize="small" displayRefresh={false} />
                <Panel.Title toggle>
                  <CampaignLink campaign={res} linkDisabled />
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <p>{message.text}</p>
                </Panel.Body>
                {footer}
              </Panel.Collapse>
            </Panel>
          );
        }}
      </HttpRequest>
    );
  }
}

WebSignupListItem.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WebSignupListItem;
