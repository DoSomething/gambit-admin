import React from 'react';
import { Col, Panel, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import MessageList from '../MessageList/MessageListContainer';
import SignupList from '../SignupList/SignupListContainer';
import VotingPlan from './VotingPlan';

const queryString = require('query-string');
const helpers = require('../../helpers');
const config = require('../../config');

function userInfo(user) {
  const lastMessagedDate = <Moment format={config.dateFormat}>{ user.last_messaged_at }</Moment>;
  const registrationDate = <Moment format="MM/DD/YY">{ user.created_at }</Moment>;
  let registrationSource;
  if (user.source) {
    registrationSource = `via ${helpers.formatSource(user.source)}`;
  }
  let address;
  let addressSource;
  if (user.addr_city) {
    address = `${user.addr_city}, ${user.addr_state} ${user.addr_zip}`;
  }
  if (user.addr_source) {
    addressSource = `via ${user.addr_source}`;
  }
  const links = (
    <span>
      <a href={user.links.aurora}>Aurora</a> | <a href={user.links.customerIo}>Customer.io</a>
    </span>
  );

  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Col sm={6}>
            <strong>Mobile:</strong> {user.mobile}
          </Col>
          <Col sm={6}>
            <strong>SMS status:</strong> {user.sms_status}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Email:</strong> {user.email}
          </Col>
          <Col sm={6}>
            <strong>Last inbound SMS:</strong> {lastMessagedDate}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Address:</strong> {address} {addressSource}
          </Col>
          <Col sm={6}>
            <strong>Links:</strong> {links}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>User created:</strong> {registrationDate} {registrationSource}
          </Col>
          <Col sm={6}>
            <strong>Voting plan:</strong> <VotingPlan user={user} />
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}

function conversationTab(conversationId, title, eventKey) {
  let content = <Panel>No messages found.</Panel>;
  if (conversationId) {
    content = <MessageList conversationId={conversationId} />;
  }
  return (
    <Tab eventKey={eventKey} title={title}>
      <br />{content}
    </Tab>
  );
}

function tabs(user) {
  const queryParams = queryString.parse(window.location.search);
  const platform = queryParams.platform;

  let slackTab = null;
  const slackConversation = user.conversations['gambit-slack'];
  if (slackConversation) {
    slackTab = conversationTab(slackConversation._id, 'Slack', 1);
  }
  const numSignups = user.signups.meta.pagination.total;
  const signupsLabel = `Signups (${numSignups})`;
  const numConversations = Object.keys(user.conversations).length;
  const signupsTab = (
    <Tab eventKey={numConversations + 1} title={signupsLabel}><br />
      <SignupList signups={user.signups.data} />
    </Tab>
  );
  const activeKey = platform ? 1 : 0;

  let smsConversationId = null;
  const smsConversation = user.conversations.sms;
  if (smsConversation) {
    smsConversationId = smsConversation._id;
  }

  return (
    <Tabs defaultActiveKey={activeKey} animation={false} id="campaign-tabs">
      {conversationTab(smsConversationId, 'SMS', 0)}
      {slackTab}
      {signupsTab}
    </Tabs>
  );
}

const UserDetail = (props) => {
  const user = props.user;
  return (
    <div>
      <PageHeader>{user.id}</PageHeader>
      {userInfo(user)}
      {tabs(user)}
    </div>
  );
};

UserDetail.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetail;
