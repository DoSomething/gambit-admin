import { gql } from 'apollo-boost';

const contentfulCampaignFields = `
  legacyCampaign {
    campaignId
  }
`;

const rogueCampaignFields = `
  campaign {
    id
    endDate
    internalTitle
  }
`;

const topicFields = `
  topic {
    id
    name
    __typename
  }
`;

const campaignTransitionTypes = `
  ...autoReplyCampaignTransition
  ...photoPostCampaignTransition
  ...textPostCampaignTransition
`;

const campaignTransitionFields = `
  id
  text
`;

const campaignTopicTransitionFragments = `
  fragment autoReplyCampaignTransition on AutoReplyTransition {
    ${campaignTransitionFields}
    topic {
      id
      name
      contentType
      ...autoReplyCampaign
    }
  }
  fragment photoPostCampaignTransition on PhotoPostTransition {
    ${campaignTransitionFields}
    topic {
      id
      name
      contentType
      ...photoPostCampaign
    }
  }
  fragment textPostCampaignTransition on TextPostTransition {
    ${campaignTransitionFields}
    topic {
      id
      name
      contentType
      ...textPostCampaign
    }
  }
`;

const autoReplyCampaignFragment = gql`
  fragment autoReplyCampaign on AutoReplyTopic {
    ${contentfulCampaignFields}
    ${rogueCampaignFields}
  }
`;

const photoPostCampaignFragment = gql`
  fragment photoPostCampaign on PhotoPostTopic {
    ${contentfulCampaignFields}
    ${rogueCampaignFields}
  }
`;

const textPostCampaignFragment = gql`
  fragment textPostCampaign on TextPostTopic {
    ${contentfulCampaignFields}
    ${rogueCampaignFields}
  }
`;

const conversationTriggers = `
  conversationTriggers {
    id
    trigger
    response {
      id
      ... on AskMultipleChoiceBroadcastTopic {
        id
        name
        text
      }
      ... on FaqAnswerTopic {
        name
        text
      }
      ${campaignTransitionTypes}
    }
  }
`;

const webSignupConfirmations = `
  webSignupConfirmations {
    ${rogueCampaignFields}
    topic {
      ${campaignTransitionTypes}
    }
  }
`;

export const getCampaignDashboardQuery = gql`
  query getCampaignDashboard {
    ${conversationTriggers}
    ${webSignupConfirmations}
  }
  ${autoReplyCampaignFragment}
  ${photoPostCampaignFragment}
  ${textPostCampaignFragment}
  ${campaignTopicTransitionFragments}
`;

export const getCampaignDetailByIdQuery = gql`
  query getCampaignDetailById($id: Int!) {
    campaign(id: $id) {
      endDate
      id
      internalTitle
    }
    ${conversationTriggers}
    ${webSignupConfirmations}
  }
  ${autoReplyCampaignFragment}
  ${photoPostCampaignFragment}
  ${textPostCampaignFragment}
  ${campaignTopicTransitionFragments}
`;

export const getBroadcastByIdQuery = gql`
  query getBroadcastById($id: String!) {
    broadcast(id: $id) {
      id
      name
      text
      contentType
      attachments {
        url
      }
      ... on AskMultipleChoiceBroadcastTopic {
        invalidAskMultipleChoiceResponse
        saidFirstChoiceTransition {
          ${campaignTransitionTypes}
        }
        saidSecondChoiceTransition {
          ${campaignTransitionTypes}
        }
        saidThirdChoiceTransition {
          ${campaignTransitionTypes}
        }
        saidFourthChoiceTransition {
          ${campaignTransitionTypes}
        }
        saidFifthChoiceTransition {
          ${campaignTransitionTypes}
        }
      }
      ... on AskSubscriptionStatusBroadcastTopic {
        invalidAskSubscriptionStatusResponse
        saidActiveTransition {
          ...autoReplyCampaignTransition
        }
        saidLessTransition {
          ...autoReplyCampaignTransition
        }
        saidNeedMoreInfo
      }
      ... on AskVotingPlanStatusBroadcastTopic {
        saidNotVotingTransition {
          ${campaignTransitionTypes}
        }
        saidVotedTransition {
          ${campaignTransitionTypes}
        }
        saidCantVoteTransition {
          ${campaignTransitionTypes}
        }
      }
      ... on AskYesNoBroadcastTopic {
        invalidAskYesNoResponse
        saidYesTransition {
          ${campaignTransitionTypes}
        }
        saidNoTransition {
          ${campaignTransitionTypes}
        }
      }
      ... on AutoReplyBroadcast {
        ${topicFields}
      }
      ... on PhotoPostBroadcast {
        ${topicFields}
      }
      ... on TextPostBroadcast {
        ${topicFields}
      }
    }
  }
  ${autoReplyCampaignFragment}
  ${photoPostCampaignFragment}
  ${textPostCampaignFragment}
  ${campaignTopicTransitionFragments}
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
          ...autoReplyCampaign
          ...photoPostCampaign
          ...textPostCampaign
        }
      }
      ... on AutoReplyTopic {
        ...autoReplyCampaign
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
  ${autoReplyCampaignFragment}
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
