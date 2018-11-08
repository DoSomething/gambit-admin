import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SignupListItem from './SignupListItem';

const SignupListContainer = props => (
  <Table>
    <thead>
      <Row componentClass="tr">
        <Col componentClass="td" md={1}>Created</Col>
        <Col componentClass="td" md={1}>Campaign</Col>
        <Col componentClass="td" md={2}>Source</Col>
        <Col componentClass="td" md={8} />
      </Row>
    </thead>
    <tbody>
      {props.signups.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
    </tbody>
  </Table>
);

SignupListContainer.propTypes = {
  signups: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SignupListContainer;
