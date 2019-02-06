import React from 'react';
import PropTypes from 'prop-types';
import TemplateList from '../TemplateList/TemplateList';

const typeTemplateMap = {
  AskSubscriptionStatusBroadcastTopic: [
    'saidActive',
    'saidLess',
    'saidNeedMoreInfo',
    'invalidAskSubscriptionStatusResponse',
  ],
  AskVotingPlanStatusBroadcastTopic: [
    'saidNotVoting',
    'saidVoted',
    'saidCantVote',
  ],
  AskYesNoBroadcastTopic: [
    'saidYes',
    'saidNo',
    'invalidAskYesNoResponse',
  ],
  AutoReplyTopic: [
    'autoReply'
  ],
  AutoReplySignupTopic: [
    'autoReply'
  ],
  PhotoPostTopic: [
    'startPhotoPostAutoReply',
    'askQuantity',
    'invalidQuantity',
    'askPhoto',
    'invalidPhoto',
    'askCaption',
    'invalidCaption',
    'askWhyParticipated',
    'invalidWhyParticipated',
    'completedPhotoPost',
    'completedPhotoPostAutoReply',
  ],
  TextPostTopic: [
    'invalidText',
    'completedTextPost',
  ],
}

const TopicTemplates = ({ topic }) => (
  <TemplateList topic={topic} templates={typeTemplateMap[topic.__typename]}/>
);

TopicTemplates.propTypes = {
  topic: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopicTemplates;
