import React from 'react';
import { Grid } from 'react-bootstrap';
import MessageList from './MessageList';

export default class Home extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <MessageList />
      </Grid>
    );
  }
}