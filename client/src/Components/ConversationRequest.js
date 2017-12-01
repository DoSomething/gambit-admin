import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid } from 'react-bootstrap';
import MessageList from './MessageList';

class ConversationRequest extends React.Component {
  constructor(props) {
    super(props);

    this.requestId = this.props.match.params.requestId;
  }

  render() {
    return (
      <Grid>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}><ControlLabel>Request Id</ControlLabel></Col>
            <Col sm={10}><FormControl.Static>{this.requestId}</FormControl.Static></Col>
          </FormGroup>
        </Form>
        <MessageList requestId={this.requestId} />
      </Grid>
    );
  }
}

ConversationRequest.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ requestId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default ConversationRequest;
