import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class RequestLoading extends React.Component {
  render() {
    return <ProgressBar active now={100} />;
  }
}
