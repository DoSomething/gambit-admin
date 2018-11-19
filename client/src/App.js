import React from 'react';
import { Well } from 'react-bootstrap';
import './App.css';

import Header from './Components/Header';
import Main from './Components/Main';

const config = require('./config');

const App = () => (
  <div>
    <Header siteName={config.siteName} />
    <Main />
    <Well>
      <center>DoSomething.org</center>
    </Well>
  </div>
);

export default App;
