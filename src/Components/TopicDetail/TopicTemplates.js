import React from 'react';
import PropTypes from 'prop-types';
import TemplateList from '../TemplateList/TemplateList';
/**
 * 1st pass, pretty verbose, but takes the "mapping" pretty literal :)
 * 
 * Order is important when defining these maps
 * index 0 holds the title (or flat property that holds the text)
 * index 1 holds the path to the transition's text property
 * index 2 holds the path to the transition's topic property
 */
const typeTemplateMap = {
  AskMultipleChoiceBroadcastTopic: [
    ['saidFirstChoice', 'saidFirstChoiceTransition.text', 'saidFirstChoiceTransition.topic'],
    ['saidSecondChoice', 'saidSecondChoiceTransition.text', 'saidSecondChoiceTransition.topic'],
    ['saidThirdChoice', 'saidThirdChoiceTransition.text', 'saidThirdChoiceTransition.topic'],
    ['saidFourthChoice', 'saidFourthChoiceTransition.text', 'saidFourthChoiceTransition.topic'],
    ['saidFifthChoice', 'saidFifthChoiceTransition.text', 'saidFifthChoiceTransition.topic'],
    /**
     * Since the text value is held in this property name we don't need
     * to specify a path to get it. This way the value at index 0 is both
     * the title of the list item and the name of the property holding the
     * text.
     */
    ['invalidAskMultipleChoiceResponse'],
  ],
  AskSubscriptionStatusBroadcastTopic: [
    ['saidActive', 'saidActiveTransition.text', 'saidActiveTransition.text'],
    ['saidLess', 'saidLessTransition.text', 'saidLessTransition.text'],
    ['saidNeedMoreInfo'],
    ['invalidAskSubscriptionStatusResponse'],
  ],
  AskVotingPlanStatusBroadcastTopic: [
    ['saidNotVoting', 'saidNotVotingTransition.text', 'saidNotVotingTransition.topic'],
    ['saidVoted', 'saidVotedTransition.text', 'saidVotedTransition.topic'],
    ['saidCantVote', 'saidCantVoteTransition.text', 'saidCantVoteTransition.topic'],
  ],
  AskYesNoBroadcastTopic: [
    ['saidYes', 'saidYesTransition.text', 'saidYesTransition.topic'],
    ['saidNo', 'saidNoTransition.text', 'saidNoTransition.topic'],
    ['invalidAskYesNoResponse'],
  ],
  AutoReplyBroadcast: [
    ['autoReply', 'topic.autoReply']
  ],
  AutoReplyTopic: [
    ['autoReply']
  ],
  AutoReplySignupTopic: [
    ['autoReply']
  ],
  PhotoPostTopic: [
    ['startPhotoPostAutoReply'],
    ['askQuantity'],
    ['invalidQuantity'],
    ['askPhoto'],
    ['invalidPhoto'],
    ['askCaption'],
    ['invalidCaption'],
    ['askWhyParticipated'],
    ['invalidWhyParticipated'],
    ['completedPhotoPost'],
    ['completedPhotoPostAutoReply'],
  ],
  TextPostTopic: [
    ['invalidText'],
    ['completedTextPost'],
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
