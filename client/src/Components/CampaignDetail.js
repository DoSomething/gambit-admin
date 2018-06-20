import React from 'react';
import { Grid, PageHeader, Panel, Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicTemplate from './TopicDetail/TopicTemplate';
import MessageList from './MessageList/MessageListContainer';
import HttpRequest from './HttpRequest';

const queryString = require('query-string');
const helpers = require('../helpers');

class CampaignDetail extends React.Component {
  static renderNav(campaign) {
    const queryParams = queryString.parse(window.location.search);
    let defaultActiveKey = 0;
    if (queryParams.skip) {
      defaultActiveKey = 1;
    }
    return (
      <Tabs defaultActiveKey={defaultActiveKey} animation={false} id="campaign-tabs">
        <Tab eventKey={0} title="Templates"><br />
          { CampaignDetail.renderTemplates(campaign.botConfig.templates) }
        </Tab>
        <Tab eventKey={1} title="Messages"><br />
          <MessageList campaignId={campaign.id} />
        </Tab>
      </Tabs>
    );
  }

  static renderDetails(campaign) {
    let keywords = null;
    if (campaign.keywords) {
      keywords = campaign.keywords.join(', ');
    }
    return (
      <Panel>
        <Panel.Body>
          <p>
            <strong>Tagline:</strong> {campaign.tagline}
          </p>
          <p>
            <strong>Keywords:</strong> {keywords}
          </p>
          <p>
            <strong>Status:</strong> {campaign.status}
          </p>
        </Panel.Body>
      </Panel>
    );
  }

  static renderTemplates(templates) {
    if (!templates) {
      return <div>No topics found.</div>;
    }
    const templateNames = Object.keys(templates);
    const rows = templateNames.map((templateName) => {
      const data = templates[templateName];
      return <TopicTemplate key={templateName} name={templateName} data={data} />;
    });
    return (
      <Grid>
        {rows}
      </Grid>
    );
  }

  constructor(props) {
    super(props);

    this.campaignId = this.props.match.params.campaignId;
    this.url = `/campaigns/${this.campaignId}`;
    this.requestPath = helpers.getCampaignByIdPath(this.campaignId);
  }

  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath}>
          {
            campaign => (
              <div>
                <PageHeader>{campaign.title}</PageHeader>
                {CampaignDetail.renderDetails(campaign)}
                {CampaignDetail.renderNav(campaign)}
              </div>
            )
          }
        </HttpRequest>
      </Grid>
    );
  }
}

CampaignDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ campaignId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default CampaignDetail;
