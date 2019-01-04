import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import GraphQLQuery from '../GraphQLQuery';
import SignupListItem from '../SignupList/SignupListItem';

/**
 * @param {String} userId
 * @return {Object}
 */
const getSignupsByUserIdQuery = gql`
  query getSignupsByUserId($id: String!) {
    signupsByUserId(id: $id) {
      campaign {
        id
        internalTitle
      }
      createdAt
      details
      id
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
      whyParticipated
    }
  }
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
