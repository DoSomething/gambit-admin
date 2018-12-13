import React from 'react';
import { Button, Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import SignupPost from './SignupPost';
import config from '../../config';

const SignupListItem = (props) => {
  const signup = props.signup;
  const campaignId = signup.campaign_id;
  const posts = signup.posts.data;
  const userId = signup.northstar_id;

  const whyParticipated = signup.why_participated
    ? (
      <div>
        <p>
          Why participated: <strong>{signup.why_participated}</strong>
        </p>
      </div>
    )
    : null;

  const postsDesc = posts.length
    ? (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="left"
        overlay={(
          <Popover>
            {whyParticipated}
            {posts.map(post => <SignupPost post={post} key={post.id} />)}
          </Popover>
        )}
      >
        <Button bsStyle="link">
          {posts.length > 1 ? <span>{posts.length} posts</span> : <span>1 {posts[0].type}</span>}
        </Button>
      </OverlayTrigger>
    )
    : null;

  return (
    <Row componentClass="tr" key={signup.signup_id}>
      <Col componentClass="td" md={2}>
        <a href={signup.signupUrl}>
          <Moment format={config.dateFormat}>{signup.created_at}</Moment>
        </a>
      </Col>
      <Col componentClass="td" md={2}>
        <strong><a href={`/campaigns/${campaignId}`}>{campaignId}</a></strong>
      </Col>
      <Col componentClass="td" md={4}>
        {signup.source}
        <div><small>{signup.details}</small></div>
      </Col>
      <Col componentClass="td" md={3}>
        <Link to={`/users/${userId}`}>{userId}</Link>
      </Col>
      <Col componentClass="td">
        {postsDesc}
      </Col>
    </Row>
  );
};

SignupListItem.propTypes = {
  signup: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SignupListItem;
