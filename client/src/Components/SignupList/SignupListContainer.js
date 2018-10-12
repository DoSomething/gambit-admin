import React from 'react';
import { Grid, Table, Row, Col } from 'react-bootstrap';
import SignupListItem from './SignupListItem';

const SignupListContainer = (props) => (
  <Table>
    <thead>
      <Row componentClass="tr">
        <Col componentClass="td" md={2}>Signup created</Col>
        <Col componentClass="td" md={2}>Campaign</Col>
        <Col componentClass="td" md={8} />
      </Row>
    </thead>
    <tbody>
      {props.signups.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
    </tbody>
  </Table>
);

export default SignupListContainer;
