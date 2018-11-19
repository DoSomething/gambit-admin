import React from 'react';
import './App.css';

import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

const config = require('./config');

const App = () => (
  <div>
    <Header siteName={config.siteName} />
    <Main />
    <Footer />
  </div>
);

export default App;
