import React from 'react';
import Request from 'react-http-request';
import PropTypes from 'prop-types';
import { Panel, ProgressBar } from 'react-bootstrap';

class HttpRequest extends React.Component {
  render() {
    return (
      <Request
        url={this.props.url}
        method="get"
        accept="application/json"
        verbose
      >
        {
          ({ error, result, loading }) => {
            if (loading) {
              return <ProgressBar active now={100} />;
            }
            if (error) {
              return (
                <Panel header="Epic fail." bsStyle="danger">
                  {error.message}
                </Panel>
              );
            }
            return this.props.children(result.body);
          }
        }
      </Request>
    );
  }
}

HttpRequest.propTypes = {
  children: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default HttpRequest;
