import React from 'react';
import PropTypes from 'prop-types';
import { Grid, PageHeader } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import GraphQLQuery from '../GraphQLQuery';
import UserDetail from './UserDetail';
import UserDetailTabs from './UserDetailTabs';

const getUserByIdQuery = gql`
  query getUserById($id: String!) {
    user(id: $id) {
      addrCity
      addrState
      addrZip
      createdAt
      email
      firstName
      id
      lastMessagedAt
      lastName
      mobile
      smsStatus
      source
      votingPlanAttendingWith
      votingPlanMethodOfTransport
      votingPlanStatus
      votingPlanTimeOfDay
    }
  }
`;

class UserDetailContainer extends React.Component {
  render() {
    const userId = this.props.match.params.userId;
    const variables = { id: userId };
    console.log(variables);
    return (
      <Grid>
        <GraphQLQuery
          query={getUserByIdQuery}
          variables={variables}
        >
          {res => {
            const user = res.user;
            return (
              <div>
                <PageHeader>{userId}</PageHeader>
                <UserDetail user={user} />
                <UserDetailTabs userId={userId} />
              </div>
            );
          }}
        </GraphQLQuery>
      </Grid>
    );
  }
}

UserDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ userId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default UserDetailContainer;
