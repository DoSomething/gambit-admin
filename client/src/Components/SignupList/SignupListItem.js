import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import SignupPost from './SignupPost';
import helpers from '../../helpers';

const SignupListItem = (props) => {
  const signup = props.signup;
  const campaignId = signup.campaign_id;
  const source = signup.signup_source ? ` via ${helpers.formatSource(signup.signup_source)}` : null;
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
        <strong><a href={`/campaigns/${campaignId}`}>{campaignId}</a></strong>
      </Col>
      <Col componentClass="td">
        {description}
        {signup.posts.data.map(post => <SignupPost post={post} key={post.id} />)}
      </Col>
    </Row>
  );
};

SignupListItem.propTypes = {
  signup: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SignupListItem;
