import React from 'react';
import { Switch, Route, } from 'react-router-dom';

import Home from './Home';
import UserList from './UserList';
import UserDetail from './UserDetail';

// The Roster component matches one of two different routes
// depending on the full pathname
const Users = () => (
  <Switch>
    <Route exact path='/users' component={UserList}/>
    <Route path='/users/:userId' component={UserDetail}/>
  </Switch>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/users' component={Users}/>
    </Switch>
  </main>
);

export default Main
