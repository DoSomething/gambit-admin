import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import VotingPlan from './VotingPlan';
import helpers from '../../helpers';
import config from '../../config';

const UserDetail = (props) => {
  const user = props.user;
  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Col sm={6}>
            <strong>Name:</strong> {user.displayName}
          </Col>
          <Col sm={6}>
            <strong>Mobile:</strong> {user.mobilePreview}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Email:</strong> {user.emailPreview}
          </Col>
          <Col sm={6}>
            <strong>SMS status:</strong> {user.smsStatus}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Address:</strong> {user.addrCity
              ? `${lodash.startCase(user.addrCity.toLowerCase())} ${user.addrState} ${user.addrZip}`
              : null} {user.addrSource ? `via ${user.addrSource}` : null}
          </Col>
          <Col sm={6}>
            <strong>Last inbound SMS:</strong> <Moment format={config.dateFormat}>
              {user.lastMessagedAt}
            </Moment>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Account created:</strong> <Moment format="MM/DD/YY">
              {user.createdAt}
            </Moment> {user.source ? `via ${helpers.formatSource(user.source)}` : null}
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
