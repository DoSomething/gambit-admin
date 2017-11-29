import React from 'react';
import { Switch, Route, } from 'react-router-dom';

import Home from './Home';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';
import ConversationList from './ConversationList';
import ConversationDetail from './ConversationDetail';
import ConversationRequest from './ConversationRequest';

const Campaigns = () => (
  <Switch>
    <Route exact path='/campaigns' component={CampaignList}/>
    <Route path='/campaigns/:campaignId' component={CampaignDetail}/>
  </Switch>
)

const Conversations = () => (
  <Switch>
    <Route exact path='/conversations' component={ConversationList}/>
    <Route path='/conversations/:conversationId' component={ConversationDetail}/>
  </Switch>
)

const Requests = () => (
  <Switch>
    <Route exact path='/requests' component={Home}/>
    <Route path='/requests/:requestId' component={ConversationRequest}/>
  </Switch>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/campaigns' component={Campaigns}/>
      <Route path='/conversations' component={Conversations}/>
      <Route path='/requests' component={Requests}/>
    </Switch>
  </main>
);

export default Main
