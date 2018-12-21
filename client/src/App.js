import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Button, Grid, Jumbotron } from 'react-bootstrap';

import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import './App.css';

class App extends Component {
  state = {
    client: null,
    config: {},
    user: null,
  };
  componentDidMount() {
    this.getSession()
      .then((res) => {
        const session = res.data;
        const authLink = setContext((_, { headers }) => {
          const token = session.user.access_token;
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          };
        });
        const httpLink = createHttpLink({
          uri: session.config.services.graphQL.url,
        });
        const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        });
        this.setState({
          config: session.config,
          user: session.user, 
          client: client,
        });
      })
      .catch(err => console.log(err));
  }
  getSession = async () => {
    const response = await fetch('/auth/session');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    if (!this.state.config.app) {
      return (
        <Grid>
          <Jumbotron>
            <center>Loading...</center>
          </Jumbotron>
        </Grid>
      );
    }
    return (
      <div>
        <Header user={this.state.user} config={this.state.config} />
        {this.state.user
         ? (
            <ApolloProvider client={this.state.client}>
              <Main />
            </ApolloProvider>
          )
          : (
            <Grid>
              <Jumbotron>
                <center>
                  <Button
                    bsStyle="info"
                    bsSize="large"
                    href={`${this.state.config.app.url}/auth/login`}
                  >
                    Login
                  </Button>
                </center>
              </Jumbotron>
            </Grid>
          )
        }
        <Footer />
      </div>
    );
  }
}

export default App;
