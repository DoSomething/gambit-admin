import React from 'react';
import { Col, Panel, PageHeader, Row, Tab, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import queryString from 'query-string';
import MessageList from '../MessageList/MessageListContainer';
import helpers from '../../helpers';
import config from '../../config';

function userInfo(user) {
  const lastMessagedDate = <Moment format={config.dateFormat}>{ user.lastMessagedAt }</Moment>;
  const registrationDate = <Moment format="MM/DD/YY">{ user.createdAt }</Moment>;
  const registrationSource = user.source ?  `via ${helpers.formatSource(user.source)}` : null;
  let address;
  let addressSource;
  if (user.addrCity) {
    address = `${lodash.startCase(user.addrCity.toLowerCase())}, ${user.addrState} ${user.addrZip}`;
  }
  if (user.addrSource) {
    addressSource = `via ${user.addrSource}`;
  }
  const unavailableText = <em>Temporarily unavailable</em>;

  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Col sm={6}>
            <strong>Mobile:</strong> {user.mobile}
          </Col>
          <Col sm={6}>
            <strong>SMS status:</strong> {unavailableText}
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
            <strong>Links:</strong> {unavailableText}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>User created:</strong> {registrationDate} {registrationSource}
          </Col>
          <Col sm={6}>
            <strong>Voting plan:</strong> {unavailableText}
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
  user.conversations = [];
  let slackTab = null;
  const slackConversation = user.conversations['gambit-slack'];
  if (slackConversation) {
    slackTab = conversationTab(slackConversation._id, 'Slack', 1);
  }

  const numConversations = Object.keys(user.conversations).length;
  const activeKey = platform ? 1 : 0;
  let smsConversationId = null;
  const smsConversation = user.conversations.sms;
  if (smsConversation) {
    smsConversationId = smsConversation._id;
  }

  // TODO: Render signups from GraphQL
  const signupsTab = <p>Temporarily unavailable.</p>;

  return (
    <Tabs defaultActiveKey={activeKey} animation={false} id="campaign-tabs">
      {conversationTab(smsConversationId, 'SMS', 0)}
      {slackTab}
      <Tab eventKey={numConversations + 1} title="Signups"><br />
        {signupsTab}
      </Tab>
    </Tabs>
  );
}

const UserDetail = (props) => {
  const user = props.user;
  return (
    <div>
      <PageHeader>{user.id}</PageHeader>
      {userInfo(user)}
    </div>
  );
};

UserDetail.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetail;
