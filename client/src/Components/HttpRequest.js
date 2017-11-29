import React from 'react';
import Request from 'react-http-request';
import PropTypes from 'prop-types';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

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
              return <RequestLoading />;
            }
            if (error) {
              return <RequestError error={error} />;
            }
            return this.props.children(result);
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
