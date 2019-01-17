import { gql } from 'apollo-boost';

const campaignFields = `
  campaign {
    id
    endDate
    internalTitle
  }
`;

const autoReplySignupCampaignFragment = gql`
  fragment autoReplySignupCampaign on AutoReplySignupTopic {
    ${campaignFields}
  }
`;

const photoPostCampaignFragment = gql`
  fragment photoPostCampaign on PhotoPostTopic {
    ${campaignFields}
  }
`;

const textPostCampaignFragment = gql`
  fragment textPostCampaign on TextPostTopic {
    ${campaignFields}
  }
`;

export const getTopicByIdQuery = gql`
  query getTopicById($id: String!) {
    topic(id: $id) {
      id
      name
      contentType
      ... on AskYesNoBroadcastTopic {
        invalidAskYesNoResponse
        saidNo
        saidNoTopic {
          id
        }
        saidYes
        saidYesTopic {
          id
          ...autoReplySignupCampaign
          ...photoPostCampaign
          ...textPostCampaign
        }
      }
      ... on AutoReplySignupTopic {
        ...autoReplySignupCampaign
        autoReply
      }
      ... on AutoReplyTopic {
        autoReply
      }
      ... on PhotoPostTopic {
        ...photoPostCampaign
        askCaption
        askPhoto
        askQuantity
        askWhyParticipated
        invalidCaption
        invalidPhoto
        invalidQuantity
        invalidWhyParticipated
        completedPhotoPost
        completedPhotoPostAutoReply
        startPhotoPostAutoReply
      }
      ... on TextPostTopic {
        ...textPostCampaign
        invalidText
        completedTextPost
      }
    }
  }
  ${autoReplySignupCampaignFragment}
  ${photoPostCampaignFragment}
  ${textPostCampaignFragment}
`;

export const postFieldsFragment = gql`
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

export const signupFieldsFragment = gql`
  fragment signupFields on Signup {
    campaign {
      id
      internalTitle
    }
    campaignId,
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

export const userFieldsFragment = gql`
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
