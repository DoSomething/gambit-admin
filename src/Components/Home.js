import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Grid, PageHeader, Table} from 'react-bootstrap';

//const url = 'https://ds-mdata-responder-staging.herokuapp.com/v1/campaigns';
// const url = 'https://gambit-conversations-prod.herokuapp.com/api/v1/messages';
const url = 'http://localhost:5100/api/v1/messages?sort=-date';

export default class Home extends React.Component {
  render() {
    return (
      <Grid>
        <PageHeader>Latest messages</PageHeader>
        { this.renderMessageList() }
      </Grid>
    );
  }

  renderMessageList() {
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
                <Table striped bordered>
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <th>User</th>
                      <th>Direction</th>
                      <th>Text</th>
                      <th>Topic</th>
                      <th>Template</th>
                    </tr>
                    { result.body.map(message => this.renderMessage(message)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    );
  }

  renderMessage(message) {
    const uri = `users/${message.userId}`;

    return (
      <tr key={ message._id }>
        <td>{ message.date }</td>
        <td><Link to={uri}>{ message.userId }</Link></td>
        <td>{ message.direction }</td>
        <td>{ message.text }</td>
        <td>{ message.topic }</td>
        <td>{ message.template }</td>
      </tr>
    );
  }
}