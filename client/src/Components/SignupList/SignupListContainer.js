import React from 'react';
import { Col, Form, FormControl, FormGroup, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';

const SignupListContainer = ({ userId }) => {
  const query = { include: 'posts', orderBy: 'id,desc' };
  if (userId) {
    query['filter[northstar_id]'] = userId;
  }
  const clientQuery = queryString.parse(window.location.search);
  const isSourceSms = clientQuery.source === 'sms';

  return (
    <Grid>
      <PageHeader> 
        <h1>Signups</h1>
        <Form inline>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl componentClass="select" placeholder="select">
              <option value="all" selected={!isSourceSms}>all</option>
              <option value="sms" selected={isSourceSms}>sms</option>
            </FormControl>
          </FormGroup>
        </Form>
      </PageHeader>
      <HttpRequest
        path={helpers.getSignupsPath()}
        query={helpers.getCampaignActivityQuery(queryString.parse(window.location.search), query)}
        description="signups"
      >
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
  userId: PropTypes.string,
};

SignupListContainer.defaultProps = {
  userId: null,
};

export default SignupListContainer;
