import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';
import ConversationList from './ConversationList/ConversationListContainer';
import UserDetail from './UserDetail/UserDetailContainer';
import ConversationRequest from './ConversationRequest';
import BroadcastList from './BroadcastList/BroadcastListContainer';
import BroadcastDetail from './Broadcast/BroadcastContainer';
import BroadcastReplyList from './Broadcast/BroadcastReplyList';

const Campaigns = () => (
  <Switch>
    <Route exact path="/campaigns" component={CampaignList} />
    <Route path="/campaigns/:campaignId" component={CampaignDetail} />
  </Switch>
);

const Conversations = () => (
  <Switch>
    <Route exact path="/conversations" component={ConversationList} />
    <Route path="/conversations/:conversationId" component={UserDetail} />
  </Switch>
);

const ConversationsRequests = () => (
  <Switch>
    <Route exact path="/requests" component={Home} />
    <Route path="/requests/:requestId" component={ConversationRequest} />
  </Switch>
);

const Broadcasts = () => (
  <Switch>
    <Route exact path="/broadcasts" component={BroadcastList} />
    <Route path="/broadcasts/:broadcastId/:macro" component={BroadcastReplyList} />
    <Route path="/broadcasts/:broadcastId" component={BroadcastDetail} />
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
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/conversations" component={Conversations} />
      <Route path="/requests" component={ConversationsRequests} />
      <Route path="/broadcasts" component={Broadcasts} />
      <Route path="/users" component={Users} />
    </Switch>
  </main>
);

export default Main;

