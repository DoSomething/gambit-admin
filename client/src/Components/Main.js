import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import CampaignDetail from './CampaignDetail/CampaignDetailContainer';
import ConversationList from './ConversationList/ConversationListContainer';
import UserDetail from './UserDetail/UserDetailContainer';
import ConversationRequest from './ConversationRequest';
import BroadcastList from './BroadcastList/BroadcastListContainer';
import BroadcastDetail from './BroadcastDetail/BroadcastDetailContainer';
import BroadcastReplyList from './BroadcastDetail/BroadcastReplyList';
import TopicDetail from './TopicDetail/TopicDetailContainer';
import TopicList from './TopicList/TopicListContainer';

const Broadcasts = () => (
  <Switch>
    <Route exact path="/broadcasts" component={BroadcastList} />
    <Route path="/broadcasts/:broadcastId/:macro" component={BroadcastReplyList} />
    <Route path="/broadcasts/:broadcastId" component={BroadcastDetail} />
  </Switch>
);

const Campaigns = () => (
  <Switch>
    <Route exact path="/campaigns" component={TopicList} />
    <Route path="/campaigns/:campaignId" component={CampaignDetail} />
  </Switch>
);

const ConversationsRequests = () => (
  <Switch>
    <Route exact path="/requests" component={Home} />
    <Route path="/requests/:requestId" component={ConversationRequest} />
  </Switch>
);

const Topics = () => (
  <Switch>
    <Route exact path="/topics" component={TopicList} />
    <Route path="/topics/:topicId" component={TopicDetail} />
  </Switch>
);

const Users = () => (
  <Switch>
    <Route exact path="/users" component={ConversationList} />
    <Route path="/users/:userId" component={UserDetail} />
  </Switch>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/broadcasts" component={Broadcasts} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/requests" component={ConversationsRequests} />
      <Route path="/topics" component={Topics} />
      <Route path="/users" component={Users} />
    </Switch>
  </main>
);

export default Main;

