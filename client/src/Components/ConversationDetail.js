import React from 'react';
import Request from 'react-http-request';
import { Col, Panel, Grid, Label, PageHeader, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import MessageList from './MessageList';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const helpers = require('../helpers');
const config = require('../config');

export default class ConversationDetail extends React.Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.match.params.conversationId;
    this.requestUrl = helpers.getConversationIdUrl(this.conversationId);
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
              return this.renderDetail(result.body.data);
            }
          }
        }
      </Request>
    );
  }

  renderDetail(conversation) {
    let label;
    if (conversation.paused) {
      label =  <small><Label>paused</Label></small>;
    }

    return (
      <Grid>
        <PageHeader>{ conversation.platformUserId } {label}</PageHeader>
        {conversation.user ? this.renderUser(conversation.user) : ''}
        <MessageList conversationId={this.conversationId} />
      </Grid>
    );
  }

  renderUser(user) {
    const lastMessagedDate = <Moment format={config.dateFormat}>{ user.last_messaged_at }</Moment>;
    const registrationDate = <Moment format="MM/DD/YY">{ user.created_at }</Moment>;
    let registrationSource;
    if (user.source) {
      registrationSource = `via ${user.source}`;
    }

    const rogueLink = <a href={user.links.rogue}>Rogue</a>;
    let mobileCommonsLink = null;
    if (user.links.mobilecommons) {
      mobileCommonsLink = <span> | <a href={user.links.mobilecommons}>Mobile Commons</a></span>;
    }

    return (
      <Panel>
        <Row>
          <Col sm={6}>
            <label>User:</label> <a href={user.links.aurora}><code>{user.id}</code></a>
          </Col>
          <Col sm={6}>
            <label>SMS status:</label> {user.sms_status}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <label>Email:</label> {user.email}
          </Col>
          <Col sm={6}>
            <label>Last inbound message:</label> {lastMessagedDate}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <label>Joined:</label> {registrationDate} {registrationSource}
          </Col>
          <Col sm={6}>
            <label>Profiles:</label> <a href={user.links.aurora}>Aurora</a> | {rogueLink} {mobileCommonsLink}
          </Col>
        </Row>
      </Panel>
    );
  }
}
