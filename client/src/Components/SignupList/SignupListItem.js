import React from 'react';
import { Col, Panel, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import SignupPost from './SignupPost';

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
  const campaignId = signup.campaign_id;
  const campaignLink = <a href={`/campaigns/${campaignId}`}>{campaignId}</a>;
  const source = signup.signup_source ? ` via ${helpers.formatSource(signup.signup_source)}` : null;
  const quantity = signup.quantity ? <strong>Quantity: {signup.quantity}</strong> : null;
  let description = null;
  if (signup.why_participated) {
    description = (
      <div>
        <p>
          Why participated: <strong>{signup.why_participated}</strong>
        </p>
      </div>
    );
  }
  return (
    <Row componentClass="tr" key={signup.signup_id}>
      <Col componentClass="td">
        <a href={signup.url}><Moment format={'MM/DD/YY'}>{signup.created_at}</Moment>{source}</a>
      </Col>
      <Col componentClass="td">
        <strong>{campaignLink}</strong>
      </Col>
      <Col componentClass="td">
        {description}
        {signup.posts.data.map(post => <SignupPost post={post} key={post.id} />)}
      </Col>
    </Row>
  );
};

export default SignupListItem;
