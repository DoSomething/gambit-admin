import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const gambit = require('../gambit');

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = gambit.conversationsUrl('messages?sort=-date');
    if (this.props.conversationId) {
       const query = encodeURIComponent(`"conversation":"${this.props.conversationId}"`);
       this.requestUrl = `${this.requestUrl}&query={${query}}`;
    }
  }

  render() {
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
                <Table striped bordered>
                  <tbody>
                    { this.renderHeader() }
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

  renderHeader() {
    let userCell;
    if (! this.props.conversationId) {
      userCell = <th>User</th>;
    }

    return (
      <tr>
        <th>Date</th>
        { userCell }
        <th>Direction</th>
        <th>Text</th>
        <th>Campaign</th>
        <th>Template</th>
      </tr>
    );
  }

  renderMessage(message) {
    let userCell;
    if (! this.props.conversationId) {
      const uri = `/conversations/${message.conversation}`;
      userCell = <td><Link to={uri}>{ message.userId }</Link></td>;
    }

    let messageText = message.text;
    if (message.direction === 'inbound') {
      messageText = <strong>{ messageText }</strong>;
    }

    return (
      <tr key={ message._id }>
        <td><small>{ message.date }</small></td>
        { userCell }
        <td>{ message.direction }</td>
        <td>{ messageText }</td>
        <td>{ message.campaignId }</td>
        <td>{ message.template }</td>
      </tr>
    );
  }
}
