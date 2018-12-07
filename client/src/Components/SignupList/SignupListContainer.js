import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';
import config from '../../config';

/**
 * @return {Object}
 */
function getSignupsQuery(userId) {
  const query = { include: 'posts', orderBy: 'id,desc' };
  if (userId) {
    query['filter[northstar_id]'] = userId;
  }
  const clientQuery = queryString.parse(window.location.search);
  if (clientQuery.skip) {
    // Rogue API expects a page parameter for current page of results.
    query.page = (clientQuery.skip / config.resultsPageSize) + 1;
  }
  if (clientQuery.source) {
    query['filter[source]'] = clientQuery.source;
  }
  return query;
}

const SignupListContainer = props => (
  <Grid>
    <HttpRequest path={helpers.getSignupsPath()} query={getSignupsQuery(props.userId)} description="signups">
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

SignupListContainer.propTypes = {
  userId: PropTypes.string,
};

SignupListContainer.defaultProps = {
  userId: null,
};

export default SignupListContainer;
