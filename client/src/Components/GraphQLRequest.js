import React from 'react';
import Request from 'react-http-request';
import PropTypes from 'prop-types';
import { Panel, ProgressBar } from 'react-bootstrap';
import helpers from '../helpers';

const GraphQLRequest = ({ query, children }) => {
  return (
    <Request 
      url={helpers.apiUrl('graphql', { query })}
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
          return children(result.body)
        }
      }
  </Request>
  );
};

GraphQLRequest.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default GraphQLRequest;
