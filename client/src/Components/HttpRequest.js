import React, { useState, useEffect } from 'react';
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

const HttpRequest = function (props) {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [httpResponse, setHttpResponse] = useState(null);

  const params = props.query;
  params.limit = pageSize;
  const clientQuery = queryString.parse(window.location.search);
  const skipCount = Number(clientQuery.skip) || 0;
  if (skipCount) {
    params.skip = this.skipCount;
  }

  useEffect(() => {
    axios.get(helpers.apiUrl(props.path), { params })
      .then((res) => {
        setHttpResponse(res);
        setIsLoading(false);
       })
      .catch((error) => {
        setHttpError(error);
        setIsLoading(false);
      });

    return function cleanup() {
      return true;
    };
  }, [isLoading]);

  if (isLoading) {
    return <ProgressBar active now={100} />;
  }

  if (httpError) {
    return (
      <Panel header="Epic fail." bsStyle="danger">
        {httpError.message}
      </Panel>
    );
  }

  const body = httpResponse.data;
  const pagination = getPagination(body, skipCount);
  const totalResultCount = pagination ? pagination.totalResultCount : 0;
  let pager = null;
  if (totalResultCount && props.displayPager) {
    pager = (
      <ListPager
        totalResultCount={totalResultCount}
        skipCount={pagination.skipCount}
        pageCount={body.data.length}
        pageSize={pageSize}
        description={props.description}
      />
    );
  }
  return (
    <div>
      {pager}
      {props.children(body)}
      {totalResultCount > pageSize ? pager : null}
    </div>
  );
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
