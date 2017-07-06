import React from 'react';
import Request from 'react-http-request';
import { Grid, PageHeader, Well, Table } from 'react-bootstrap';

//const url = 'https://ds-mdata-responder-staging.herokuapp.com/v1/campaigns';
// const url = 'https://gambit-conversations-prod.herokuapp.com/api/v1/messages';
const url = 'http://localhost:5100/api/v1/';

function getMessagesUrl(platformId) {
  const query = encodeURIComponent(`"userId":"${platformId}"`);
  return `${url}messages?query={${query}}`;
}

function renderMessage(message) {
  return (
    <tr key={ message._id }>
      <td>{ message.direction }</td>
      <td>{ message.text }</td>
      <td>{ message.topic }</td>
      <td>{ message.date }</td>
    </tr>
  );
}


export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.userUrl = `${url}users/${this.userId}`;
    const query = encodeURIComponent(`"userId":"${this.userId}"`);
    this.messagesUrl = `${url}messages?query={${query}}`;
    console.log(this.messagesUrl);
  }

  render() {
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
              return <div>{ JSON.stringify(error) }</div>;
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
        <h2>History</h2>
        { this.renderUserMessages(user) }
      </Grid>
    );
  }

  renderUserMessages(user) {
    const url = getMessagesUrl(user._id);
    console.log(url);

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
                <Table striped bordered condensed hover>
                  <tbody>
                  <tr>
                    <th>Direction</th>
                    <th>Text</th>
                    <th>Topic</th>
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
