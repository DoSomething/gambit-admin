import React from 'react';
import { Col, Grid, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HttpRequest from '../HttpRequest';
import Post from '../SignupList/SignupPost';
import helpers from '../../helpers';

const query = { orderBy: 'desc' };

const PostListContainer = () => (
  <Grid>
    <HttpRequest path={helpers.getPostsPath()} query={query} description="posts">
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
              const campaignId = post.signup.data.campaign_id;
              return (
                <Row componentClass="tr" key={post.id}>
                  <Col md={3} componentClass="td">
                    <a href={post.signupUrl}>{post.created_at}</a>
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
