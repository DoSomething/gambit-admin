import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import queryString from 'query-string';
import UserSignups from './UserSignups';
import HttpRequest from '../HttpRequest';
import MessageList from '../MessageList/MessageListContainer';
import helpers from '../../helpers';

function formatPlatform(text) {
  if (text === 'sms') {
    return 'SMS';
  }
  if (text === 'gambit-slack') {
    return 'Slack';
  }
  return text;
}

const UserDetailTabs = (props) => {
  const queryParams = queryString.parse(window.location.search);
  const platform = queryParams.platform;

  return (
    <HttpRequest
      path={helpers.getUserByIdPath(props.userId)}
      displayPager={false}
    >
      {res => {
        const signupsTabIndex = res.data.length + 1;
        return (
          <Tabs animation={false} id="user-detail-tabs">
            {res.data.map((conversation, index) => (
              <Tab key={index} eventKey={index} title={formatPlatform(conversation.platform)}>
                <br /><MessageList conversationId={conversation._id} />
              </Tab>
            ))}
            <Tab key={signupsTabIndex} eventKey={signupsTabIndex} title="Signups">
              <br /><UserSignups userId={props.userId} />
            </Tab>
          </Tabs>
        )}
      }
    </HttpRequest>
  );
};

UserDetailTabs.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserDetailTabs;
