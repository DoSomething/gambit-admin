import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Pager, ProgressBar } from 'react-bootstrap';
import queryString from 'query-string';
import { omit } from 'lodash';

function renderPager() {
  const location = window.location;
  const clientQuery = queryString.parse(location.search);
  const currentPage = Number(clientQuery.page) || 1;
  // Get our current URL, but exclude the page query parameter.
  const query = queryString.stringify(omit(clientQuery, ['page']));
  const url = `${[location.protocol, '//', location.host, location.pathname]
    .join('')}?${query ? `${query}&` : ''}page=`;

  return (
    <Pager>
      {currentPage > 1
        ? (
          <Pager.Item
            previous
            href={`${url}${currentPage - 1}`}
          >
            Previous
          </Pager.Item>
        )
        : null}
      <Pager.Item
        next
        href={`${url}${currentPage + 1}`}
      >
        Next
      </Pager.Item>
    </Pager>
  );
}

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
          const pager = this.props.displayPager ? renderPager(): null;
          return (
            <div>
              {pager}
              {this.props.children(data)}
              {pager}
            </div>
          );
        }}
      </Query>
    );
  }
}


GraphQLQuery.propTypes = {
  children: PropTypes.func.isRequired,
  displayPager: PropTypes.bool,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  variables: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

GraphQLQuery.defaultProps = {
  displayPager: false,
  variables: {},
};

export default GraphQLQuery;
