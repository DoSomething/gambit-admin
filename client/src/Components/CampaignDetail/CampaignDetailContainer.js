import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CampaignDetail from './CampaignDetail';
import TopicListItem from '../TopicList/TopicListItem';
import HttpRequest from '../HttpRequest';

const helpers = require('../../helpers');

class CampaignDetailContainer extends React.Component {
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
                <CampaignDetail campaign={campaign} />
                <h3>Active topics</h3>
                <Table striped hover>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Triggers</th>
                      <th>Post type</th>
                    </tr>
                    {campaign.topics.map(topic => (
                      <TopicListItem
                        key={topic.id}
                        topic={topic}
                      />
                    ))}
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

CampaignDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ campaignId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default CampaignDetailContainer;
