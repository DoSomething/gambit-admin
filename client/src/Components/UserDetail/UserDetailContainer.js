import React from 'react';
import PropTypes from 'prop-types';
import { Grid, PageHeader } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import GraphQLQuery from '../GraphQLQuery';
import UserDetail from './UserDetail';

/**
 * @param {String} userId
 * @return {Object}
 */
function getUserQuery(userId) {
  return gql`
    {
      user(id: "${userId}") {
        addrCity
        addrState
        addrZip
        createdAt
        email
        firstName
        id
        lastMessagedAt
        mobile
        source
      }
    }
  `;
}

class UserDetailContainer extends React.Component {
  render() {
    const userId = this.props.match.params.userId;
    return (
      <Grid>
        <GraphQLQuery query={getUserQuery(userId)}>
          {res => {
            const user = res.user;
            console.log('user', user);
            return (
              <div>
                <PageHeader>{user.id}</PageHeader>
                <UserDetail user={user} />
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
