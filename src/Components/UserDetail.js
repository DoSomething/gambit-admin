import React from 'react';
import Request from 'react-http-request';
import { Grid, PageHeader, Well, Table } from 'react-bootstrap';

const gambit = require('../gambit');

function renderMessage(message) {
  return (
    <tr key={ message._id }>
      <td>{ message.direction }</td>
      <td>{ message.text }</td>
      <td>{ message.topic }</td>
      <td>{ message.template }</td>
      <td>{ message.date }</td>
    </tr>
  );
}

export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.userId;
    this.userUrl = gambit.url(`users/${this.userId}`);
    console.log(this.userUrl);

    const query = encodeURIComponent(`"userId":"${this.userId}"`);
    this.messagesUrl = gambit.url(`messages?sort=-date&query={${query}}`);
  }

  get() {
    return (
      <Request
        url={this.userUrl}
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else if (error) {
              return <code>{ JSON.stringify(error) }</code>;
            } else {
              return this.renderUserDetail(result.body);
            }
          }
        }
      </Request>
    );
  }

  renderUserDetail(user) {
    return (
      <Grid>
        <PageHeader>{ user._id }</PageHeader>
        <Well>
          <div>Platform: { user.platform }</div>
          <div>Current Campaign: { user.campaignId }</div>
        </Well>
        <h2>Latest messages</h2>
        { this.renderUserMessages(user) }
      </Grid>
    );
  }

  renderUserMessages(user) {
    return (
      <Request
        url={this.messagesUrl}
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
                <Table striped bordered condensed hover>
                  <tbody>
                  <tr>
                    <th>Direction</th>
                    <th>Text</th>
                    <th>Topic</th>
                    <th>Template</th>
                    <th>Date</th>
                  </tr>
                  { result.body.map(message => renderMessage(message)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    ); 
  }
}
