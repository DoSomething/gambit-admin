import React from 'react';
import Request from 'react-http-request';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import Moment from 'react-moment';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const gambit = require('../gambit');

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.requestUrl = gambit.conversationsUrl('messages?sort=-createdAt');
    if (this.props.conversationId) {
       const query = encodeURIComponent(`"conversationId":"${this.props.conversationId}"`);
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
      userCell = <th>Conversation</th>;
    }

    return (
      <tr>
        <th>Date</th>
        { userCell }
        <th>Direction</th>
        <th>Text</th>
        <th>Topic</th>
        <th>Campaign</th>
        <th>Template</th>
      </tr>
    );
  }

  renderMessage(message) {
    let userCell;
    if (! this.props.conversationId) {
      const uri = `/conversations/${message.conversationId}`;
      userCell = <td><small><Link to={uri}>{ message.conversationId }</Link></small></td>;
    }

    let messageText = message.text;
    if (message.direction === 'inbound') {
      messageText = <strong>{ messageText }</strong>;
    }

    const dateFormat = `MMMM Do YYYY, h:mm:ss a`;
    let createdAtCell;
    if (message.createdAt) {
      createdAtCell = <Moment format={dateFormat}>{ message.createdAt }</Moment>
    }else if(message.date){
      createdAtCell = <Moment format={dateFormat}>{ message.date }</Moment>
    }

    return (
      <tr key={ message._id }>
        <td className='date'>
          <small>{ createdAtCell }</small>
        </td>
        { userCell }
        <td>
          <small>{ message.direction }</small>
        </td>
        <td>{ messageText }</td>
        <td>
          <small>{ message.topic }</small>
        </td>
        <td>{ message.campaignId }</td>
        <td>
          <small>{ message.template }</small>
        </td>
      </tr>
    );
  }
}
