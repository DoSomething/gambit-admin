import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import ListForm from '../ListForm';
import SignupListItem from './SignupListItem';

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
      signups(source: $source, count: 50) {
        ${fields}
      }
    }
  `;
}

function getAllSignupsQuery() {
  return gql`
    {
      signups(count: 50) {
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
      <Query
        query={sourceQueryParam ? getSignupsBySourceQuery() : getAllSignupsQuery()}
        variables={sourceQueryParam ? { source: sourceQueryParam } : {}}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
          return (
            <Table hover>
              <tbody>
                {data.signups.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
              </tbody>
            </Table>
          );
        }}
      </Query>
    </Grid>
  );
};

export default SignupListContainer;
