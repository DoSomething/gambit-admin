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
function getUserSignupsQuery(userId) {
  return gql`
    {
      signupsByUserId(id: "${userId}") {
        campaign {
          id
          internalTitle
        }
        createdAt
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
        whyParticipated
      }
    }
  `;
}

const UserSignups = (props) => {
  return (
    <GraphQLQuery query={getUserSignupsQuery(props.userId)}>
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
