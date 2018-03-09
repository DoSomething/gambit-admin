import React from 'react';
import Request from 'react-http-request';
import PropTypes from 'prop-types';
import { Panel, ProgressBar } from 'react-bootstrap';

const queryString = require('query-string');
const helpers = require('../helpers');

class HttpRequest extends React.Component {
  constructor(props) {
    super(props);

    const apiQuery = this.props.query;
    const clientQuery = queryString.parse(window.location.search);
    this.skipCount = Number(clientQuery.skip);
    if (this.skipCount) {
      apiQuery.query.skip = this.skipCount;
    } else {
      this.skipCount = 0;
    }

    this.url = helpers.apiUrl(this.props.path, apiQuery);
  }
  render() {
    return (
      <Request
        url={this.url}
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
  query: PropTypes.shape,
  path: PropTypes.string.isRequired,
};

HttpRequest.defaultProps = {
  query: {},
};

export default HttpRequest;
