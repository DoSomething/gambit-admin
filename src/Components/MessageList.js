import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';

const gambit = require('../gambit');

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = gambit.url('messages?sort=-date');
    if (this.props.userId) {
       const query = encodeURIComponent(`"userId":"${this.props.userId}"`);
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
              return <div>loading...</div>;
            } else if (error) {
              return <div>{ JSON.stringify(error) }</div>;
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
    if (! this.props.userId) {
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
    if (! this.props.userId) {
      const uri = `/users/${message.userId}`;
      userCell = <td><Link to={uri}>{ message.userId }</Link></td>;
    }

    return (
      <tr key={ message._id }>
        <td><small>{ message.date }</small></td>
        { userCell }
        <td>{ message.direction }</td>
        <td>{ message.text }</td>
        <td>{ message.campaignId }</td>
        <td>{ message.template }</td>
      </tr>
    );
  }
}
