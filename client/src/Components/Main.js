import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import CampaignDetail from './CampaignDetail/CampaignDetailContainer';
// TODO: Rename ConversationList as UserList
import UserList from './ConversationList/ConversationListContainer';
import UserDetail from './UserDetail/UserDetailContainer';
import ConversationRequest from './ConversationRequest';
import BroadcastList from './BroadcastList/BroadcastListContainer';
import BroadcastDetail from './BroadcastDetail/BroadcastDetailContainer';
import BroadcastReplyList from './BroadcastDetail/BroadcastReplyList';
import TopicDetail from './TopicDetail/TopicDetailContainer';
import TopicList from './TopicList/TopicListContainer';
import TriggerList from './TriggerList/TriggerListContainer';

const Main = () => (
  <main>
    <Switch>
      <Route path="/broadcasts/:broadcastId/:macro" component={BroadcastReplyList} />
      <Route path="/broadcasts/:broadcastId" component={BroadcastDetail} />
      <Route path="/broadcasts" component={BroadcastList} />
      <Route path="/campaigns/:campaignId" component={CampaignDetail} />
      <Route path="/campaigns" component={TopicList} />
      <Route path="/requests/:requestId" component={ConversationRequest} />
      <Route path="/requests" component={Home} />
      <Route path="/topics/:topicId" component={TopicDetail} />
      <Route path="/topics" component={TopicList} />
      <Route path="/triggers" component={TriggerList} />
      <Route path="/users/:userId" component={UserDetail} />
      <Route path="/users" component={UserList} />
      <Route path="/" component={Home} />
    </Switch>
  </main>
);

export default Main;
