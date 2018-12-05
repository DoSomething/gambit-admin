import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';

const SignupListContainer = (props) => {
  const query = { include: 'posts', orderBy: 'id,desc' };
  if (props.userId) {
    query['filter[northstar_id'] = props.userId;
  }
  return (
    <Grid>
      <HttpRequest path={helpers.getSignupsPath()} query={query} description="signups">
        {res => (
          <Table hover>
            <tbody>
              <Row componentClass="tr" key="header">
                <Col md={3} componentClass="th">Created</Col>
                <Col md={3} componentClass="th">User</Col>
                <Col md={2} componentClass="th">Campaign</Col>
                <Col md={6} componentClass="th" />
              </Row>
              {res.data.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
            </tbody>
          </Table>
        )}
      </HttpRequest>
    </Grid>
  );
};

SignupListContainer.propTypes = {
  signups: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SignupListContainer;
