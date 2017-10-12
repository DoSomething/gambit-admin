import React from 'react';
import { Switch, Route, } from 'react-router-dom';

import Home from './Home';
import ConversationList from './ConversationList';
import ConversationDetail from './ConversationDetail';
import GambitRequest from './GambitRequest';

// The Roster component matches one of two different routes
// depending on the full pathname
const Conversations = () => (
  <Switch>
    <Route exact path='/conversations' component={ConversationList}/>
    <Route path='/conversations/:conversationId' component={ConversationDetail}/>
  </Switch>
)

const Requests = () => (
  <Switch>
    <Route exact path='/requests' component={Home}/>
    <Route path='/requests/:requestId' component={GambitRequest}/>
  </Switch>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/conversations' component={Conversations}/>
      <Route path='/requests' component={Requests}/>
    </Switch>
  </main>
);

export default Main
