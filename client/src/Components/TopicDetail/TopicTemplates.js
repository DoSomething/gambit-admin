import React from 'react';
import PropTypes from 'prop-types';
import TemplateList from '../TemplateList/TemplateList';

const TopicTemplates = ({ topic }) => {
  const type = topic.__typename;

  if (type === 'AskSubscriptionStatusBroadcastTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={[
          'saidActive',
          'saidLess',
          'saidNeedMoreInfo',
          'invalidAskSubscriptionStatusResponse',
        ]} 
      />
    );
  }

  if (type === 'AskYesNoBroadcastTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={[
          'saidYes',
          'saidNo',
          'invalidAskYesNoResponse',
        ]} 
      />
    );
  }

  if (type === 'AutoReplyTopic' || type === 'AutoReplySignupTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={['autoReply']} 
      />
    );
  }

  if (type === 'TextPostTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={['invalidText', 'completedTextPost']} 
      />
    );
  }

  if (type === 'PhotoPostTopic') {
    return (
      <TemplateList
        topic={topic}
        templates={[
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
        ]} 
      />
    );
  }

  return null;
}

TopicTemplates.propTypes = {
  topic: PropTypes.object.isRequired,
};

export default TopicTemplates;
