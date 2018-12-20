import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';


import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import './App.css';

const httpLink = createHttpLink({
  uri: 'https://graphql-dev.dosomething.org/graphql',
});

class App extends Component {
  state = {
    client: null,
    user: {},
  };
  componentDidMount() {
    this.callApi()
      .then((res) => {
        const authLink = setContext((_, { headers }) => {
          const token = res.data.user.access_token;
          // return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          };
        });
        const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        });
        this.setState({
          user: res.data.user, 
          client: client,
        });
      })
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/auth/user');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    if (!this.state.client) {
      return <div>Loading</div>;
    }
    return (
      <ApolloProvider client={this.state.client}>
        <div>
          <Header user={this.state.user} />
          <Main />
          <Footer />
        </div>
      </ApolloProvider>
    );
  }
}


export default App;

