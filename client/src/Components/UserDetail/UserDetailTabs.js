import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import queryString from 'query-string';
import UserSignups from './UserSignups';
import HttpRequest from '../HttpRequest';
import MessageList from '../MessageList/MessageListContainer';
import helpers from '../../helpers';

const UserDetailTabs = (props) => {
  return (
    <HttpRequest
      path={helpers.getUserByIdPath(props.userId)}
      displayPager={false}
    >
      {res => {
        const signupsTabIndex = res.data.length + 1;
        const userConversations = {};
        res.data.forEach((conversation) => {
          userConversations[conversation.platform] = conversation;
        });
  
        return (
          <Tabs
            defaultActiveKey={queryString.parse(window.location.search).platform ? 1 : 0}
            animation={false}
            id="user-detail-tabs"
          >
            <Tab key={0} eventKey={0} title="SMS">
              <br />
              {userConversations['sms']
                ? <MessageList conversationId={userConversations['sms']._id} />
                : <p>No messages found.</p>
              }
            </Tab>
            {userConversations['gambit-slack']
              ? (
                <Tab key={1} eventKey={1} title="Slack">
                  <MessageList conversationId={userConversations['gambit-slack']._id} />
                </Tab>
                )
              : null}
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
