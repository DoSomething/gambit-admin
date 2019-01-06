import { gql } from 'apollo-boost';

export const getPostFieldsFragment = gql`
  fragment postFields on Post {
    id
    action
    createdAt
    quantity
    signup {
      id
      campaign {
        id
        internalTitle
      }
      permalink
    }
    source
    status
    text
    type
    url
    user {
      id
      firstName
    }
  }
`;

export const getSignupFieldsFragment = gql`
  fragment signupFields on Signup {
    campaign {
      id
      internalTitle
    }
    createdAt
    details
    id
    permalink
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
    user {
      id
      firstName
    }
    whyParticipated
  }
`;

export const getUserFieldsFragment = gql`
  fragment userFields on User {
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
`;
