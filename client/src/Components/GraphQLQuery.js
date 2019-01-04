import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ProgressBar } from 'react-bootstrap';

class GraphQLQuery extends React.Component {
  render() {
    return (
      <Query
        query={this.props.query}
        variables={this.props.variables}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <ProgressBar active now={100} />
            );
          };
          if (error) {
            return (
              <div>
                <p>Error</p>
                <code>{error.message}</code>
              </div>
            );
          };
          return this.props.children(data);
        }}
      </Query>
    );
  }
}


GraphQLQuery.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  variables: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

GraphQLQuery.defaultProps = {
  variables: {},
};

export default GraphQLQuery;
