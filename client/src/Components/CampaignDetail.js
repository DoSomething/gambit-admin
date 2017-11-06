import React from 'react';
import Request from 'react-http-request';
import { Col, Grid, PageHeader, Panel, Row, Tab, Tabs } from 'react-bootstrap';
import CampaignTemplate from './CampaignTemplate';
import MessageList from './MessageList';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const queryString = require('query-string');
const helpers = require('../helpers');

export default class CampaignDetail extends React.Component {
  constructor(props) {
    super(props);

    this.campaignId = this.props.match.params.campaignId;
    this.url = `/campaigns/${this.campaignId}`;
    this.requestUrl = helpers.getCampaignIdUrl(this.campaignId);
  }

  render() {
    return (
      <Grid>
        { this.fetchCampaign() }
      </Grid>
    );
  }

  renderNav(campaign) {
    const queryParams = queryString.parse(window.location.search);
    let defaultActiveKey = 0;
    if (queryParams.skip) {
      defaultActiveKey = 1;
    }
    return (
      <Tabs defaultActiveKey={defaultActiveKey} animation={false} id="campaign-tabs">
        <Tab eventKey={0} title="Templates"><br />
          { this.renderTemplates(campaign.templates) }
        </Tab>   
        <Tab eventKey={1} title="Messages"><br />
          <MessageList campaignId={this.campaignId} />
        </Tab>
      </Tabs>
    );
  }

  fetchCampaign() {
    return (
      <Request
        url={ this.requestUrl }
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <RequestLoading />;
            } else if (error) {
              return <RequestError error={error} />
            } else {
              const campaign = result.body;
              return (
                <div>                                  
                  <PageHeader>{campaign.title} <small></small></PageHeader>
                  { this.renderDetails(campaign) }
                  { this.renderNav(campaign) }
                </div>
              );
            }
          }
        }
      </Request>
    );
  }

  renderDetails(campaign) {
    return (
      <Panel>
        <Row>
          <Col sm={12}><label>Tagline:</label> {campaign.tagline}</Col>
        </Row>
        <Row>
          <Col sm={6}>
            <label>Keywords:</label> {campaign.keywords.join(', ')}
          </Col>
          <Col sm={6}>
            <label>Status:</label> {campaign.status}
          </Col>
        </Row>
      </Panel>
    );
  }

  renderTemplates(templates) {
    const templateNames = Object.keys(templates);
    const rows = templateNames.map((templateName) => {
      return <CampaignTemplate key={templateName} name={templateName} data={templates[templateName]} />
    });
    return (
      <Grid>
        {rows}
      </Grid>
    );
  }
}
