import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GraphQLRequest from '../GraphQLRequest';
import SignupListItem from './SignupListItem';

const SignupListContainer = ({ userId, displayFilters }) => {
  const query = `{
    signups(count: 50) {
      id
      campaign {
        id
        internalTitle
      }
      createdAt
      details
      posts {
        action
        id
        quantity
        status
        text
        type
        url
      }
      source
      user {
        id
        firstName
      }
    }
  }`;

  return (
    <Grid>
      <PageHeader>
        Signups
      </PageHeader>
      <GraphQLRequest query={query}>
        {res => (
          <Table hover>
            <tbody>
              {res.signups.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
            </tbody>
          </Table>
        )}
      </GraphQLRequest>
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
