import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import ListForm from '../ListForm';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';

const SignupListContainer = ({ userId, displayFilters }) => {
  const query = { include: 'posts', orderBy: 'id,desc' };
  if (userId) {
    query['filter[northstar_id]'] = userId;
  }
  const filters = displayFilters
    ? (
      <PageHeader>
        Signups
        <ListForm />
      </PageHeader>
    )
    : null;

  return (
    <Grid>
      {filters}
      <HttpRequest
        path={helpers.getSignupsPath()}
        query={helpers.getCampaignActivityQuery(queryString.parse(window.location.search), query)}
        description="signups"
      >
        {res => (
          <Table hover>
            <tbody>
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
  displayFilters: PropTypes.bool,
};

SignupListContainer.defaultProps = {
  userId: null,
  displayFilters: true,
};

export default SignupListContainer;
