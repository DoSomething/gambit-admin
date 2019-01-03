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

const pageSize = helpers.getDefaultPageSize();

const fields = `
  id
  action
  createdAt
  quantity
  signup {
    id
    campaign {
      id
      internalTitle
    }
  }
  source
  status
  text
  type
  url
  user {
    id
    firstName
  }
`;

function getPostsBySourceAndTypeQuery() {
  return gql`
    query getPostsBySource($source: String, $type: String) {
      posts(source: $source, type: $type, count: ${pageSize}) {
        ${fields}
      }
    }
  `;
}

function getPostsBySourceQuery() {
  return gql`
    query getPostsBySource($source: String) {
      posts(source: $source, count: ${pageSize}) {
        ${fields}
      }
    }
  `;
}

function getPostsByTypeQuery() {
  return gql`
    query getPostsByType($type: String) {
      posts(type: $type, count: ${pageSize}) {
        ${fields}
      }
    }
  `;
}

function getAllPostsQuery() {
  return gql`
    {
      posts(count: ${pageSize}) {
        ${fields}
      }
    }
  `;
}

const PostListContainer = () => {
  let query = getAllPostsQuery();
  const { source, type } = queryString.parse(window.location.search);
  const variables = {};
  if (source && type) {
    variables.source = source;
    variables.type = type;
    query = getPostsBySourceAndTypeQuery();
  }
  else if (source) {
    variables.source = source;
    query = getPostsBySourceQuery();
  } else if (type) {
    variables.type = type;
    query = getPostsByTypeQuery();
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
      > 
        {res => (
            <Table hover>
              <tbody>
                {res.posts.map((post) => {
                  const user = post.user;
                  const campaign = post.signup.campaign;
                  return (
                    <Row componentClass="tr" key={post.id}>
                      <Col md={2} componentClass="td">
                        <a href={post.signupUrl}>
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
