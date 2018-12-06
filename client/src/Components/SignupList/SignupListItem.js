import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import SignupPost from './SignupPost';
import config from '../../config';

const SignupListItem = (props) => {
  const signup = props.signup;
  const campaignId = signup.campaign_id;
  const userId = signup.northstar_id;

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
        <a href={signup.signupUrl}>
          <Moment format={config.dateFormat}>{signup.created_at}</Moment>
        </a>
        <div>{signup.source}</div>
        <div><small>{signup.details}</small></div>
      </Col>
      <Col componentClass="td">
        <Link to={`/users/${userId}`}>{userId}</Link>
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
