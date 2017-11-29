import React from 'react';
import { Col, Grid, PageHeader, Panel, Row, Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignTemplate from './CampaignTemplate';
import MessageList from './MessageList';
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
          { CampaignDetail.renderTemplates(campaign.templates) }
        </Tab>
        <Tab eventKey={1} title="Messages"><br />
          <MessageList campaignId={this.campaignId} />
        </Tab>
      </Tabs>
    );
  }

  static renderDetails(campaign) {
    return (
      <Panel>
        <Row>
          <Col sm={12}><strong>Tagline:</strong> {campaign.tagline}</Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Keywords:</strong> {campaign.keywords.join(', ')}
          </Col>
          <Col sm={6}>
            <strong>Status:</strong> {campaign.status}
          </Col>
        </Row>
      </Panel>
    );
  }

  static renderTemplates(templates) {
    const templateNames = Object.keys(templates);
    const rows = templateNames.map((templateName) => {
      const data = templates[templateName];
      return <CampaignTemplate key={templateName} name={templateName} data={data} />;
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
    this.requestUrl = helpers.getCampaignIdUrl(this.campaignId);
  }

  render() {
    return (
      <Grid>
        <HttpRequest url={this.requestUrl}>
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
