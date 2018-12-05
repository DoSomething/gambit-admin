import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import Post from '../SignupList/SignupPost';
import helpers from '../../helpers';
import config from '../../config';

/**
 * @return {Object}
 */
function getPostsQuery() {
  // TODO: We want to include the signup here to permalink to Rogue, but it breaks things on QA.
  // @see https://www.pivotaltracker.com/n/projects/2019429/stories/158870350
  const query = { orderBy: 'id,desc' };
  const clientQuery = queryString.parse(window.location.search);
  const skipQueryParam = clientQuery.skip;
  if (skipQueryParam) {
    // Rogue API expects a page parameter for current page of results.
    query.page = (skipQueryParam / config.resultsPageSize) + 1;
  }
  const typeQueryParam = clientQuery.type;
  if (typeQueryParam) {
    query['filter[type]'] = typeQueryParam;
  }
  return query;
}

const PostListContainer = () => (
  <Grid>
    <HttpRequest path={helpers.getPostsPath()} query={getPostsQuery()} description="posts">
      {res => (
        <Table hover>
          <tbody>
            <Row componentClass="tr" key="header">
              <Col md={3} componentClass="th">Created</Col>
              <Col md={3} componentClass="th">User</Col>
              <Col md={2} componentClass="th">Campaign</Col>
              <Col md={6} componentClass="th" />
            </Row>
            {res.data.map((post) => {
              const campaignId = post.signup ? post.signup.data.campaign_id : null;
              return (
                <Row componentClass="tr" key={post.id}>
                  <Col md={3} componentClass="td">
                    <a href={post.signupUrl}>
                      <Moment format={config.dateFormat}>{post.created_at}</Moment>
                    </a>
                  </Col>
                  <Col md={3} componentClass="td">
                    <Link to={`/users/${post.northstar_id}`}>{post.northstar_id}</Link>
                  </Col>
                  <Col md={2} componentClass="td">
                    <Link to={`/campaigns/${campaignId}`}>{campaignId}</Link>
                  </Col>
                  <Col md={6} componentClass="td"><Post post={post} /></Col>
                </Row>
              );
            })}
          </tbody>
        </Table>
      )}
    </HttpRequest>
  </Grid>
);

export default PostListContainer;
