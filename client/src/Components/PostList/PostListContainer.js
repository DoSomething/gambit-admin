import React from 'react';
import { Col, Grid, PageHeader, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import queryString from 'query-string';
import HttpRequest from '../HttpRequest';
import ListForm from '../ListForm';
import Post from '../SignupList/SignupPost';
import helpers from '../../helpers';
import config from '../../config';

const PostListContainer = () => {
  const query = { include: 'signup' };
  return (
    <Grid>
      <PageHeader>
        Posts
        <ListForm />
      </PageHeader>
      <HttpRequest
        path={helpers.getPostsPath()}
        query={helpers.getCampaignActivityQuery(queryString.parse(window.location.search), query)}
        description="posts"
      >
        {res => (
          <Table hover>
            <tbody>
              {res.data.map((post) => {
                const campaignId = post.signup ? post.signup.data.campaign_id : null;
                return (
                  <Row componentClass="tr" key={post.id}>
                    <Col md={2} componentClass="td">
                      <a href={post.signupUrl}>
                        <Moment format={config.dateFormat}>{post.created_at}</Moment>
                      </a>
                    </Col>
                    <Col md={2} componentClass="td">
                      <Link to={`/campaigns/${campaignId}`}>{campaignId}</Link>
                    </Col>
                    <Col componentClass="td" md={2}>
                      {post.source}
                    </Col>
                    <Col md={3} componentClass="td">
                      <Link to={`/users/${post.northstar_id}`}>{post.northstar_id}</Link>
                    </Col>
                    <Col omponentClass="td"><Post post={post} /></Col>
                  </Row>
                );
              })}
            </tbody>
          </Table>
        )}
      </HttpRequest>
    </Grid>
  );
};

export default PostListContainer;
