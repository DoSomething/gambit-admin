import React from 'react';
import { Panel } from 'react-bootstrap';

export default class RequestError extends React.Component {
  render() {
    return (
      <Panel header="An error occurred." bsStyle="danger">
        <code>{ JSON.stringify(this.props.error) }</code>
      </Panel>
    );
  }
}
