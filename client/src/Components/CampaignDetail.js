import React from 'react';
import { Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TopicListItem from './TopicList/TopicListItem';
import HttpRequest from './HttpRequest';

const helpers = require('../helpers');

class CampaignDetail extends React.Component {
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
                <h3>Active topics</h3>
                <Table striped hover>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Triggers</th>
                      <th>Post type</th>
                    </tr>
                    {campaign.topics.map(topic => <TopicListItem topic={topic} />)}
                  </tbody>
                </Table>
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
