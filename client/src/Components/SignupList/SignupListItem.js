import React from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import SignupPost from './SignupPost';
import config from '../../config';

const SignupListItem = (props) => {
  const signup = props.signup;
  const campaign = signup.campaign;
  const posts = signup.posts;
  const user = signup.user;

  const whyParticipated = signup.whyParticipated
    ? (
      <div>
        <p>
          Why participated: <strong>{signup.whyParticipated}</strong>
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
        <p>
          {posts.length > 1 ? <span>{posts.length} posts</span> : <span>1 {posts[0].type}</span>}
        </p>
      </OverlayTrigger>
    )
    : null;
  const userCol = signup.user
    ? (
      <Col componentClass="td" md={2}>
        <Link to={`/users/${user.id}`}>{user.firstName || user.id}</Link>
      </Col>
    ) : null;

  return (
    <Row componentClass="tr" key={signup.id}>
      <Col componentClass="td" md={2}>
        <a href={signup.signupUrl}>
          <Moment format={config.dateFormat}>{signup.createdAt}</Moment>
        </a>
      </Col>
      <Col componentClass="td" md={4}>
        <a href={`/campaigns/${campaign.id}`}>
          {campaign.internalTitle}
        </a>
      </Col>
      {userCol}
      <Col componentClass="td">
        {signup.source}
        <div><small>{signup.details}</small></div>
        {postsDesc}
      </Col>
    </Row>
  );
};

SignupListItem.propTypes = {
  signup: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SignupListItem;
