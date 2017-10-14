import React from 'react';
import Request from 'react-http-request';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid, PageHeader, Panel, Tab, Tabs, Table, Well } from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const config = require('../config');
const gambit = require('../gambit');

export default class CampaignDetail extends React.Component {
  constructor(props) {
    super(props);

    this.campaignId = this.props.match.params.campaignId;
    this.requestUrl = gambit.conversationsUrl(`campaigns/${this.campaignId}`);
    console.log(this.requestUrl);
  }

  render() {
    return (
      <Grid fluid={true}>
        { this.fetchCampaign() }
      </Grid>
    );
  }

  renderNav(campaign) {
    return (
      <Tabs defaultActiveKey={0} animation={false} id="noanim-tab-example">
        <Tab eventKey={0} title="Details"><br />
          { this.renderDetails(campaign) }
        </Tab>
        <Tab eventKey={1} title="Messages"><br />test</Tab>
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
                  <PageHeader>{campaign.title}</PageHeader>
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
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Cached At</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>
                <Moment format={config.dateFormat}>{ campaign.updatedAt }
                </Moment></FormControl.Static>
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
          <td sm={3}><strong>{ template }</strong></td>
          <td sm={9}>{ templates[template] }</td>
        </tr>
      );
    });
    return <Table striped><tbody>{ rows }</tbody></Table>;
  }
}
