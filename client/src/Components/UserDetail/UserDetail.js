import React from 'react';
import { Col, Panel, Row, Tab, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import UserSignups from './UserSignups';
import MessageList from '../MessageList/MessageListContainer';
import helpers from '../../helpers';
import config from '../../config';

function userInfo(user) {
  const registrationDate = <Moment format="MM/DD/YY">{ user.createdAt }</Moment>;
  const registrationSource = user.source ?  `via ${helpers.formatSource(user.source)}` : null;
  const address = user.addrCity
    ? `${lodash.startCase(user.addrCity.toLowerCase())}, ${user.addrState} ${user.addrZip}`
    : null;
  const unavailableText = <em>Temporarily unavailable</em>;
  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Col sm={6}>
            <strong>Mobile:</strong> {user.mobile}
          </Col>
          <Col sm={6}>
            <strong>SMS status:</strong> {user.smsStatus.toLowerCase()}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Email:</strong> {user.email}
          </Col>
          <Col sm={6}>
            <strong>Last inbound SMS:</strong> <Moment format={config.dateFormat}>
              {user.lastMessagedAt}
            </Moment>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Address:</strong> {address} {user.addrSource ? `via ${user.addrSource}` : null}
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
  return (
    <Tabs animation={false} id="user-detail-tabs">
      <Tab eventKey="1" title="Signups"><br />
        <UserSignups userId={user.id} />
      </Tab>
    </Tabs>
  );
}

const UserDetail = (props) => {
  const user = props.user;
  return (
    <div>
      {userInfo(user)}
      {tabs(user)}
    </div>
  );
};

UserDetail.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetail;
