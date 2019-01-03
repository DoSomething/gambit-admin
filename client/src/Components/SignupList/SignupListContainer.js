import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import queryString from 'query-string';
import GraphQLQuery from '../GraphQLQuery';
import ListForm from '../ListForm';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';

const pageSize = helpers.getDefaultPageSize();

const fields = `
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
    source
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
`;

function getSignupsBySourceQuery() {
  return gql`
    query getSignupsBySource($source: String) {
      signups(source: $source, count: ${pageSize}) {
        ${fields}
      }
    }
  `;
}

function getAllSignupsQuery() {
  return gql`
    {
      signups(count: ${pageSize}) {
        ${fields}
      }
    }
  `;
}

const SignupListContainer = () => {
  const sourceQueryParam = queryString.parse(window.location.search).source;
  return (
    <Grid>
      <PageHeader>
        Signups
        <ListForm />
      </PageHeader>
      <GraphQLQuery
        query={sourceQueryParam ? getSignupsBySourceQuery() : getAllSignupsQuery()}
        variables={sourceQueryParam ? { source: sourceQueryParam } : {}}
      > 
        {(res) => {
          return (
            <Table hover>
              <tbody>
                {res.signups.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
              </tbody>
            </Table>
          );
        }}
      </GraphQLQuery>
    </Grid>
  );
};

export default SignupListContainer;
