import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import ListForm from '../ListForm';
import SignupListItem from './SignupListItem';


const GET_SIGNUPS = gql`{
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

const SignupListContainer = () => (
  <Grid>
    <PageHeader>
      Signups
      <ListForm />
    </PageHeader>
    <Query query={GET_SIGNUPS}>
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

export default SignupListContainer;
