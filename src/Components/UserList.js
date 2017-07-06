import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import { Grid, PageHeader, Table } from 'react-bootstrap';

//const url = 'https://ds-mdata-responder-staging.herokuapp.com/v1/campaigns';
// const url = 'https://gambit-conversations-prod.herokuapp.com/api/v1/messages';
const url = 'http://localhost:5100/api/v1/users';

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
        url={url}
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else if (error) {
              return <div>{ JSON.stringify(error) }</div>;
            } else {
              return (
                <Table striped bordered hover>
                  <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Platform</th>
                    <th>Campaign</th>
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
        <td>{ user.campaignId }</td>
        <td>{ user.topic }</td>
        <td>{ user.lastReplyTemplate }</td>
      </tr>
    );
  }
}
