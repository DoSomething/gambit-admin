import React from 'react';
import Request from 'react-http-request';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid, PageHeader } from 'react-bootstrap';
import MessageList from './MessageList';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const gambit = require('../gambit');

export default class ConversationDetail extends React.Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.match.params.conversationId;
    this.requestUrl = gambit.url(`conversations/${this.conversationId}`);
  }

  render() {
    return (
      <Request
        url={this.requestUrl}
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
              return this.renderDetail(result.body);
            }
          }
        }
      </Request>
    );
  }

  renderDetail(conversation) {
    return (
      <Grid>
        <PageHeader>{ conversation.userId } <small>{ conversation.medium } </small></PageHeader>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Conversation Id</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>{ conversation._id }</FormControl.Static>
            </Col>
          </FormGroup>
        </Form>
        <h2>Messages</h2>
        <MessageList conversationId={this.conversationId} />
      </Grid>
    );
  }
}
