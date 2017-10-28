import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const queryString = require('query-string');
const config = require('../config');
const helpers = require('../helpers');

export default class ConversationList extends React.Component {
  constructor(props) {
    super(props);
    const query = {
      sort: '-updatedAt',
    };

    const queryParams = queryString.parse(window.location.search);
    const platformUserId = queryParams.platformUserId;
    if (platformUserId) {
      query.query = `{"platformUserId":{"$regex":"${platformUserId}"}}`;
    }

    this.requestUrl = helpers.getConversationsUrl(query);
  }

  render() {
    return (
      <Grid>
        <PageHeader>Conversations</PageHeader>
        { this.renderList() }
      </Grid>
    );
  }

  renderList() {
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
              return (
                <Table striped hover>
                  <tbody>
                  <tr>
                    <th>Last Updated</th>
                    <th>Platform User ID</th>
                    <th>Current Campaign</th>
                    <th>Topic</th>
                  </tr>
                  { result.body.data.map(conversation => this.renderSummary(conversation)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    );
  }

  renderSummary(conversation) {
    return (
      <tr key={ conversation._id }>
        <td>
          <small><Moment format={ config.dateFormat }>{ conversation.updatedAt }</Moment></small>
        </td>
        <td><Link to={`conversations/${conversation._id}`}>{ conversation.platformUserId }</Link></td>
        <td>{ conversation.campaignId }</td>
        <td>
          <small>{ conversation.topic }</small>
        </td>
      </tr>
    );
  }
}
