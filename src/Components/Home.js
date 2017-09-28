import React from 'react';
import {Grid, PageHeader} from 'react-bootstrap';
import MessageList from './MessageList';

export default class Home extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <PageHeader>Latest reply messages</PageHeader>
        <MessageList />
      </Grid>
    );
  }
}