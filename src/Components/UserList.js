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
        <PageHeader>Users</PageHeader>
        { this.renderUserList() }
      </Grid>
    );
  }

  renderUserList() {
    return (
      <Request
        url={ gambit.url('users') }
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
                    <th>ID</th>
                    <th>Platform</th>
                    <th>Platform ID</th>
                    <th>Current Campaign</th>
                    <th>Topic</th>
                    <th>Last Reply Template</th>
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

  renderUser(user) {
    return (
      <tr key={ user._id }>
        <td><Link to={`users/${user._id}`}>{ user._id }</Link></td>
        <td>{ user.platform }</td>
        <td>{ user.platformId }</td>
        <td>{ user.campaignId }</td>
        <td>{ user.topic }</td>
        <td>{ user.lastReplyTemplate }</td>
      </tr>
    );
  }
}
