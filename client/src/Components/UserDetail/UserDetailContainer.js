import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
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
    return (
      <Grid>
        <GraphQLQuery query={getUserQuery(this.props.match.params.userId)}>
          {res => <UserDetail user={res.user} />}
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
