import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import App from './App';

const client = new ApolloClient({ uri: 'https://graphql-qa.dosomething.org/graphql' });

render((
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
), document.getElementById('root'));
