import React from 'react';
import Request from 'react-http-request';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

export default class HttpRequest extends React.Component {
  render() {
    return (
      <Request
        url={ this.props.url }
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
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
