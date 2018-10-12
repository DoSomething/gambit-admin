import React from 'react';
import { Col, Panel, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const queryString = require('query-string');
const helpers = require('../../helpers');
const config = require('../../config');

function postLabel(status) {
  let style = 'warning';
  if (status === 'rejected') {
    style = 'danger';
  } else if (status === 'accepted') {
    style = 'success';
  }
  return <Label bsStyle={style}>{status}</Label>;
}

const SignupListItem = (props) => {
  const signup = props.signup;
  let posts = null;
  const numPosts = signup.posts.data.length;
  if (numPosts) {
    posts = signup.posts.data.map((post, index) => {
      const postDate = <Moment format={'MM/DD/YY'}>{post.created_at}</Moment>;
      let postSource = null;
      if (post.source) {
        postSource = ` via ${helpers.formatSource(post.source)}`;
      }
      const status = postLabel(post.status);

      let whyParticipated = null;
      // Posts are ordered by ascending created date. We only ask for Why Participated if it's
      // the User's first post for the Campaign.
      if (index === 0) {
        whyParticipated = (
          <ListGroupItem>
            <strong>Why Participated:</strong> {signup.why_participated}
          </ListGroupItem>
        );
      }
      return (
        <ListGroup key={post.id}>
          <ListGroupItem>
            <Image src={post.media.url} height={200} />
          </ListGroupItem>
          <ListGroupItem>
            <strong>Caption:</strong> {post.media.caption}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Quantity:</strong> {signup.quantity}
          </ListGroupItem>
          {whyParticipated}
          <ListGroupItem>
            <strong>Submitted:</strong> {postDate}{postSource} {status}
          </ListGroupItem>
        </ListGroup>
      );
    });
  }
  const campaignId = signup.campaign_id;
  const campaignLink = <a href={`/campaigns/${campaignId}`}>{campaignId}</a>;
  const source = signup.signup_source ? ` via ${helpers.formatSource(signup.signup_source)}` : null;
  return (
    <tr key={signup.signup_id}>
      <td><strong>{campaignLink}</strong></td>
      <td>
        <a href={signup.url}><Moment format={'MM/DD/YY'}>{signup.created_at}</Moment>{source}</a>
      </td>
      <td>{posts}</td>
    </tr>
  );
};

export default SignupListItem;
