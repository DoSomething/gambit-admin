import React from 'react';
import Request from 'react-http-request';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid, PageHeader, Tab, Tabs, Table } from 'react-bootstrap';
import MessageList from './MessageList';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const helpers = require('../helpers');

export default class CampaignDetail extends React.Component {
  constructor(props) {
    super(props);

    this.campaignId = this.props.match.params.campaignId;
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
    return (
      <Tabs defaultActiveKey={0} animation={false} id="campaign-tabs">
        <Tab eventKey={0} title="Messages"><br />
          <MessageList campaignId={this.campaignId} />
        </Tab>
        <Tab eventKey={1} title="Details"><br />
          { this.renderDetails(campaign) }
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
      <div>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Keywords</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>{ campaign.keywords.join(',') }</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Status</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>{ campaign.status }</FormControl.Static>
            </Col>
          </FormGroup>
        </Form>
        <h2>Templates</h2>
        { this.renderTemplates(campaign.templates) }
      </div>
    );
  }

  renderTemplates(templates) {
    const templateNames = Object.keys(templates).sort();
    const rows = templateNames.map((template) => {
      return (
        <tr>
          <td sm={4}><strong>{ template }</strong></td>
          <td sm={6}>{ templates[template].rendered }</td>
          <td sm={2}>{ templates[template].override ? <strong>overridden</strong> : 'default' }</td>
        </tr>
      );
    });
    return <Table striped>
      <tbody>{ rows }</tbody>
    </Table>;
  }
}
