import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import App from './App';

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
