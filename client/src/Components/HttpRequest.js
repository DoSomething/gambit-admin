import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import queryString from 'query-string';

import ListPager from './ListPager';
import helpers from '../helpers';
import config from '../config';

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
    this.state ={
      isLoading: true,
    };
    this.apiQuery = this.props.query;
    this.apiQuery.limit = pageSize;
    const clientQuery = queryString.parse(window.location.search);
    this.skipCount = Number(clientQuery.skip) || 0;
    if (this.skipCount) {
      this.apiQuery.skip = this.skipCount;
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(helpers.apiUrl(this.props.path), { params: this.apiQuery })
      .then(res => this.setState({
        res: res,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
  render() {
    if (this.state.isLoading) {
      return <ProgressBar active now={100} />;
    }
    if (this.state.error) {
      return (
        <Panel header="Epic fail." bsStyle="danger">
          {this.state.error.message}
        </Panel>
      );
    }
    const body = this.state.res.data;
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
