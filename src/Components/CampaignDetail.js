import React from 'react';
import Request from 'react-http-request';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid, Nav, NavItem, PageHeader, Panel, Table } from 'react-bootstrap';
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
        { this.renderCampaign() }
      </Grid>
    );
  }

  renderNav() {
    return (
      <Nav bsStyle="tabs" activeKey={1}>
        <NavItem eventKey={1} href="/home">Details</NavItem>
        <NavItem eventKey={2} title="Item">Messages</NavItem>
      </Nav>
    );
  }

  renderCampaign() {
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
                  { this.renderNav() }
                  <br />
                  { this.renderDetails(campaign) }
                  <h2>Templates</h2>
                  { this.renderTemplates(campaign.templates) }
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

  renderSummary(campaign) {
    return (
      <tr key={ campaign._id }>
        <td>{ campaign._id }</td>
        <td>{ campaign.title }</td>
        <td>{ campaign.keywords.join(',') }</td>
      </tr>
    );
  }
}
