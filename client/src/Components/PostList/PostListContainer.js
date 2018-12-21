import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import queryString from 'query-string';
import ListForm from '../ListForm';
import Post from '../SignupList/SignupPost';
import config from '../../config';

// TODO: If a campaign doesn't exist, pulling signup { campaign { id } } throws an error.
// @see https://dosomething.slack.com/archives/C1V0M6RPE/p1545336640000300?thread_ts=1545335609.000200&cid=C1V0M6RPE
const fields = `
  id
  action
  createdAt
  quantity
  signup {
    id
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

function getPostsBySourceQuery() {
  return gql`
    query getPostsBySource($source: String) {
      posts(source: $source, count: 50) {
        ${fields}
      }
    }
  `;
}

function getAllPostsQuery() {
  return gql`
    {
      posts(count: 50) {
        ${fields}
      }
    }
  `;
}

const PostListContainer = () => {
  const sourceQueryParam = queryString.parse(window.location.search).source;
  return (
    <Grid>
      <PageHeader>
        Posts
        <ListForm />
      </PageHeader>
      <Query
        query={sourceQueryParam ? getPostsBySourceQuery() : getAllPostsQuery()}
        variables={sourceQueryParam ? { source: sourceQueryParam } : {}}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;

          if (error) return (
            <div>
              <p>Error :(</p>
              <code>{error.message}</code>
            </div>
          );

          return (
            <Table hover>
              <tbody>
                {data.posts.map((post) => {
                  const userId = post.user.id;
                  return (
                    <Row componentClass="tr" key={post.id}>
                      <Col md={2} componentClass="td">
                        <a href={post.signupUrl}>
                          <Moment format={config.dateFormat}>{post.createdAt}</Moment>
                        </a>
                      </Col>
                      <Col componentClass="td" md={2}>
                        {post.source}
                      </Col>
                      <Col md={3} componentClass="td">
                        <Link to={`/users/${userId}`}>{userId}</Link>
                      </Col>
                      <Col componentClass="td">
                        <Post post={post} displayFooter={false} />
                      </Col>
                    </Row>
                  );
                })}
              </tbody>
            </Table>
          );
        }}
      </Query>
    </Grid>
  );
};

export default PostListContainer;
