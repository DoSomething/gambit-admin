import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';

const gambit = require('../gambit');
let url = gambit.url('messages?sort=-date');

/**
 * @param {string} userId
 */
export default class MessageList extends React.Component {
  render() {
    let includeUser = false;
    if (this.props.userId) {
      includeUser = true;
    }

    return (
      <Request
        url={ url }
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
                    { this.renderHeader(includeUser) }
                    { result.body.map(message => this.renderMessage(message, includeUser)) }
                  </tbody>
                </Table>
              );
            }
          }
        }
      </Request>
    );
  }

  renderHeader(includeUser) {
    return (
      <tr>
        <th>Date</th>
        <th>User</th>
        <th>Direction</th>
        <th>Text</th>
        <th>Topic</th>
        <th>Campaign</th>
        <th>Template</th>
      </tr>
    );
  }

  renderMessage(message, includeUser) {
    const uri = `users/${message.userId}`;

    return (
      <tr key={ message._id }>
        <td>{ message.date }</td>
        <td><Link to={uri}>{ message.userId }</Link></td>
        <td>{ message.direction }</td>
        <td>{ message.text }</td>
        <td>{ message.topic }</td>
        <td>{ message.campaignId }</td>
        <td>{ message.template }</td>
      </tr>
    );
  }
}
