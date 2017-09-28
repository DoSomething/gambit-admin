import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const config = require('../config');
const gambit = require('../gambit');

export default class ConversationList extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <PageHeader>Conversations</PageHeader>
        { this.renderList() }
      </Grid>
    );
  }

  renderList() {
    return (
      <Request
        url={ gambit.conversationsUrl('conversations?sort=-updatedAt') }
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
                <Table striped bordered hover>
                  <tbody>
                  <tr>
                    <th>Last Updated</th>
                    <th>ID</th>
                    <th>Platform</th>
                    <th>Platform User ID</th>
                    <th>Current Campaign</th>
                    <th>Topic</th>
                  </tr>
                  { result.body.map(conversation => this.renderSummary(conversation)) }
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
        <td><Link to={`conversations/${conversation._id}`}>{ conversation._id }</Link></td>
        <td>
          <small>{ conversation.platform }</small>
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
