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

/**
 * TODO: Once it stops throwing a 500 error, we want to include 'include=signup' in our
 * campaignActivity query, but it breaks things on QA.
 * @see https://www.pivotaltracker.com/n/projects/2019429/stories/158870350
 */
const PostListContainer = () => (
  <Grid>
    <PageHeader>
      <h1>Posts</h1>
      <ListForm />
    </PageHeader>
    <HttpRequest
      path={helpers.getPostsPath()}
      query={helpers.getCampaignActivityQuery(queryString.parse(window.location.search))}
      description="posts"
    >
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
