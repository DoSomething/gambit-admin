import React from 'react';
import { Switch, Route, } from 'react-router-dom';

import Home from './Home';
import ConversationList from './ConversationList';
import ConversationDetail from './ConversationDetail';

// The Roster component matches one of two different routes
// depending on the full pathname
const Conversations = () => (
  <Switch>
    <Route exact path='/conversations' component={ConversationList}/>
    <Route path='/conversations/:conversationId' component={ConversationDetail}/>
  </Switch>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/conversations' component={Conversations}/>
    </Switch>
  </main>
);

export default Main
