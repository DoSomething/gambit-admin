import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const gambit = require('../gambit');

export default class UserList extends React.Component {
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
        url={ gambit.url('conversations') }
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
                    <th>Platform</th>
                    <th>Platform User ID</th>
                    <th>Current Campaign</th>
                    <th>Topic</th>
                    <th>Last Outbound Template</th>
                  </tr>
                  { result.body.map(user => this.renderUser(user)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    );
  }

  renderUser(conversation) {
    return (
      <tr key={ conversation._id }>
        <td>{ conversation.medium }</td>
        <td><Link to={`conversations/${conversation._id}`}>{ conversation.userId }</Link></td>
        <td>{ conversation.campaignId }</td>
        <td>{ conversation.topic }</td>
        <td>{ conversation.lastReplyTemplate }</td>
      </tr>
    );
  }
}
