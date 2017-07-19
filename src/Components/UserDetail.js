import React from 'react';
import Request from 'react-http-request';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid, PageHeader } from 'react-bootstrap';
import MessageList from './MessageList';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const gambit = require('../gambit');

export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.userId;
    this.requestUrl = gambit.url(`users/${this.userId}`);
  }

  render() {
    return (
      <Request
        url={this.requestUrl}
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <RequestLoading />;
            } else if (error) {
              return <RequestError error={error} />
            } else {
              return this.renderUserDetail(result.body);
            }
          }
        }
      </Request>
    );
  }

  renderUserDetail(user) {
    return (
      <Grid>
        <PageHeader>{ user._id }</PageHeader>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Platform</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>{ user.platform }</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Platform User Id</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>{ user.platformId }</FormControl.Static>
            </Col>
          </FormGroup>
        </Form>
        <h2>Latest messages</h2>
        <MessageList userId={this.userId} />
      </Grid>
    );
  }
}
