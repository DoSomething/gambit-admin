import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import queryString from 'query-string';
import GraphQLQuery from '../GraphQLQuery';
import ListForm from '../ListForm';
import SignupListItem from './SignupListItem';
import helpers from '../../helpers';
import { getSignupFieldsFragment } from '../../graphql';

const pageSize = helpers.getDefaultPageSize();

const getSignupsPageBySourceQuery = gql`
  query getSignupsPageBySource($source: String, $page: Int) {
    signups(source: $source, page: $page, count: ${pageSize}) {
      ...signupFields
    }
  }
  ${getSignupFieldsFragment}
`;

const getSignupsPageQuery = gql`
  query getSignupsPage($page: Int) {
    signups(page: $page, count: ${pageSize}) {
      ...signupFields
    }
  }
  ${getSignupFieldsFragment}
`;

const SignupListContainer = () => {
  const clientQuery = queryString.parse(window.location.search);
  const source = clientQuery.source;
  return (
    <Grid>
      <PageHeader>
        Signups
        <ListForm />
      </PageHeader>
      <GraphQLQuery
        query={source ? getSignupsPageBySourceQuery : getSignupsPageQuery}
        variables={{ page: Number(clientQuery.page) || 1, source }}
        displayPager={true}
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
