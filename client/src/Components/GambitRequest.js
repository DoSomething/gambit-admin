import React from 'react';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid } from 'react-bootstrap';
import MessageList from './MessageList';

export default class GambitRequest extends React.Component {
  constructor(props) {
    super(props);

    this.requestId = this.props.match.params.requestId;
  }

  render() {
    return (
      <Grid>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Request Id</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl.Static>{ this.requestId }</FormControl.Static>
            </Col>
          </FormGroup>
        </Form>
        <MessageList requestId={this.requestId} />
      </Grid>
    );
  }
}
