import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import GraphQLQuery from '../GraphQLQuery';
import SignupListItem from '../SignupList/SignupListItem';
import { getSignupFieldsFragment } from '../../graphql';

const getSignupsByUserIdQuery = gql`
  query getSignupsByUserId($id: String!) {
    signupsByUserId(id: $id) {
      ...signupFields
    }
  }
  ${getSignupFieldsFragment}
`;

const UserSignups = (props) => {
  return (
    <GraphQLQuery
      query={getSignupsByUserIdQuery}
      variables={{ id: props.userId }}
    >
      {res => {
        return (
          <Table>
            <tbody>
            {res.signupsByUserId
              .map(signup => <SignupListItem key={signup.id} signup={signup} />)}
            </tbody>
          </Table>
        );
      }}
    </GraphQLQuery>
);
};

UserSignups.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserSignups;
