import React from 'react';
import { Col, Panel, Row, Tab, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import VotingPlan from './VotingPlan';
import MessageList from '../MessageList/MessageListContainer';
import helpers from '../../helpers';
import config from '../../config';

const UserDetail = (props) => {
  const user = props.user;
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
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </Col>
          <Col sm={6}>
            <strong>Mobile:</strong> {user.mobile}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Email:</strong> {user.email}
          </Col>
          <Col sm={6}>
            <strong>SMS status:</strong> {user.smsStatus}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Location:</strong> {address} {user.addrSource ? `via ${user.addrSource}` : null}
          </Col>
          <Col sm={6}>
            <strong>Last inbound SMS:</strong> <Moment format={config.dateFormat}>
              {user.lastMessagedAt}
            </Moment>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Account created:</strong> {registrationDate} {registrationSource}
          </Col>
          <Col sm={6}>
            <strong>Voting plan:</strong> <VotingPlan user={user} />
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}

UserDetail.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetail;
