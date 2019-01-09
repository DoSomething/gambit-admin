import React from 'react';
import PropTypes from 'prop-types';
import { Grid, PageHeader } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import GraphQLQuery from '../GraphQLQuery';
import UserDetail from './UserDetail';
import UserDetailTabs from './UserDetailTabs';
import { userFieldsFragment } from '../../graphql';

const getUserByIdQuery = gql`
  query getUserById($id: String!) {
    user(id: $id) {
      ...userFields
    }
  }
  ${userFieldsFragment}
`;

class UserDetailContainer extends React.Component {
  render() {
    const userId = this.props.match.params.userId;
    return (
      <Grid>
        <GraphQLQuery
          query={getUserByIdQuery}
          variables={{ id: userId }}
        >
          {res => (
            <div>
              <PageHeader>{userId}</PageHeader>
              <UserDetail user={res.user} />
              <UserDetailTabs userId={userId} />
            </div>
          )}
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
