import React from 'react';
import Request from 'react-http-request';
import PropTypes from 'prop-types';
import { Panel, ProgressBar } from 'react-bootstrap';
import ListPager from './ListPager';

const queryString = require('query-string');
const helpers = require('../helpers');
const config = require('../config');

const pageSize = config.resultsPageSize;

/**
 * @param {Object} body
 * @param {Number} skipQueryParam
 * @return {Object}
 */
function getPagination(body, skipQueryParam) {
  // Gambit API:
  if (body && body.meta && body.meta.pagination) {
    return {
      skipCount: skipQueryParam,
      totalResultCount: body.meta.pagination.total,
    };
  }
  return null;
}

class HttpRequest extends React.Component {
  constructor(props) {
    super(props);
    const apiQuery = this.props.query;
    apiQuery.limit = pageSize;
    const clientQuery = queryString.parse(window.location.search);
    this.skipCount = Number(clientQuery.skip) || 0;
    if (this.skipCount) {
      apiQuery.skip = this.skipCount;
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
            const body = result.body;
            const pagination = getPagination(body, this.skipCount);
            const totalResultCount = pagination ? pagination.totalResultCount : 0;
            let pager = null;
            if (totalResultCount && this.props.displayPager) {
              pager = (
                <ListPager
                  totalResultCount={totalResultCount}
                  skipCount={pagination.skipCount}
                  pageCount={body.data.length}
                  pageSize={pageSize}
                  description={this.props.description}
                />
              );
            }
            return (
              <div>
                {pager}
                {this.props.children(body)}
                {totalResultCount > pageSize ? pager : null}
              </div>
            );
          }
        }
      </Request>
    );
  }
}

HttpRequest.propTypes = {
  children: PropTypes.func.isRequired,
  description: PropTypes.string,
  displayPager: PropTypes.bool,
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
};

HttpRequest.defaultProps = {
  description: null,
  displayPager: true,
  query: {},
};

export default HttpRequest;
