import React from 'react';
import { gql } from 'apollo-boost';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import queryString from 'query-string';
import GraphQLQuery from '../GraphQLQuery';
import ListForm from '../ListForm';
import Post from '../SignupList/SignupPost';
import config from '../../config';
import helpers from '../../helpers';
import { postFieldsFragment } from '../../graphql';

const pageSize = helpers.getDefaultPageSize();

const getPostsPageBySourceAndTypeQuery = gql`
  query getPostsPageBySourceAndType($source: String, $type: String, $page: Int) {
    posts(source: $source, type: $type, page: $page, count: ${pageSize}) {
      ...postFields
    }
  }
  ${postFieldsFragment}
`;

const getPostsPageBySourceQuery = gql`
  query getPostsPageBySource($source: String, $page: Int) {
    posts(source: $source, page: $page, count: ${pageSize}) {
      ...postFields
    }
  }
  ${postFieldsFragment}
`;

const getPostsPageByTypeQuery = gql`
  query getPostsPageByType($type: String, $page: Int) {
    posts(type: $type, page: $page, count: ${pageSize}) {
      ...postFields
    }
  }
  ${postFieldsFragment}
`;

const getPostsPageQuery = gql`
  query getPostsPage($page: Int) {
    posts(page: $page, count: ${pageSize}) {
      ...postFields
    }
  }
  ${postFieldsFragment}
`;

const PostListContainer = () => {
  const { source, type, page } = queryString.parse(window.location.search);
  const variables = {
    page: Number(page) || 1,
  };
  let query = getPostsPageQuery;
  if (source && type) {
    variables.source = source;
    variables.type = type;
    query = getPostsPageBySourceAndTypeQuery;
  }
  else if (source) {
    variables.source = source;
    query = getPostsPageBySourceQuery;
  } else if (type) {
    variables.type = type;
    query = getPostsPageByTypeQuery;
  }

  return (
    <Grid>
      <PageHeader>
        Posts
        <ListForm />
      </PageHeader>
      <GraphQLQuery
        query={query}
        variables={variables}
        displayPager={true}
      > 
        {res => (
            <Table hover>
              <tbody>
                {res.posts.map((post) => {
                  const user = post.user;
                  const campaign = post.signup ? post.signup.campaign : {};
                  return (
                    <Row componentClass="tr" key={post.id}>
                      <Col md={2} componentClass="td">
                        <a href={post.signup ? post.signup.permalink : '#'}>
                          <Moment format={config.dateFormat}>{post.createdAt}</Moment>
                        </a>
                      </Col>
                      <Col md={4} componentClass="td">
                        <Link to={`/campaigns/${campaign.id}`}>{campaign.internalTitle}</Link>
                      </Col>
                      <Col componentClass="td" md={2}>
                        <Link to={`/users/${user.id}`}>{user.firstName || user.id}</Link>
                      </Col>
                      <Col componentClass="td">
                        <Post post={post} displayFooter={false} />
                      </Col>
                    </Row>
                  );
                })}
              </tbody>
            </Table>
        )}
      </GraphQLQuery>
    </Grid>
  );
};

export default PostListContainer;
