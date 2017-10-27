import React from 'react';
import './App.css';

import Header from './Components/Header';
import Main from './Components/Main';

const config = require('./config');

const App = () => (
  <div>
    <Header siteName={ config.siteName } />
    <Main />
  </div>
)

export default App