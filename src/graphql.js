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
    ${contentfulCampaignFields}
    ${rogueCampaignFields}
  }
`;

const transitionTopicFields = `
  topic {
    id
    name
    __typename
    ${contentfulCampaignFields}
    ${rogueCampaignFields}
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
    ${transitionTopicFields}
  }
  fragment photoPostCampaignTransition on PhotoPostTransition {
    ${campaignTransitionFields}
    ${transitionTopicFields}
  }
  fragment textPostCampaignTransition on TextPostTransition {
    ${campaignTransitionFields}
    ${transitionTopicFields}
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

export const getCampaignDashboardQuery = gql`
  query getCampaignDashboard {
    ${conversationTriggers}
  }
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
  }
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
        topic {
          id
          name
          autoReply
          __typename
          ${contentfulCampaignFields}
          ${rogueCampaignFields}
        }
      }
      ... on PhotoPostBroadcast {
        ${topicFields}
      }
      ... on TextPostBroadcast {
        ${topicFields}
      }
    }
  }
  ${campaignTopicTransitionFragments}
`;

export const getTopicByIdQuery = gql`
  query getTopicById($id: String!) {
    topic(id: $id) {
      id
      name
      contentType
      ... on AskYesNoBroadcastTopic {
        text
        invalidAskYesNoResponse
        saidNoTransition {
          ${campaignTransitionTypes}
        }
        saidYesTransition {
          ${campaignTransitionTypes}
        }
      }
      ... on AutoReplyTopic {
        ${contentfulCampaignFields}
        ${rogueCampaignFields}
        autoReply
      }
      ... on PhotoPostTopic {
        ${contentfulCampaignFields}
        ${rogueCampaignFields}
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
        ${contentfulCampaignFields}
        ${rogueCampaignFields}
        invalidText
        completedTextPost
      }
    }
  }
  ${campaignTopicTransitionFragments}
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
    displayName
    emailPreview
    id
    lastMessagedAt
    mobilePreview
    permalink
    smsStatus
    source
    votingMethod
    votingPlanAttendingWith
    votingPlanMethodOfTransport
    votingPlanStatus
    votingPlanTimeOfDay
  }
`;
