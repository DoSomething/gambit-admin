import React from 'react';
import { Image, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

function postLabel(status) {
  let style = 'warning';
  if (status === 'rejected') {
    style = 'danger';
  } else if (status === 'accepted') {
    style = 'success';
  }
  return <Label bsStyle={style}>{status}</Label>;
}

const SignupPost = (props) => {
  const post = props.post;
  const source = post.source ? ` via ${post.source}` : null;
  let mediaGroupItem = null;
  if (post.media.url) {
    mediaGroupItem = (
      <ListGroupItem>
        <Image src={post.media.url} height={200} />
      </ListGroupItem>
    );
  }
  let quantityItem = null;
  if (post.quantity) {
    quantityItem = (
      <ListGroupItem>
        Quantity: <strong>{post.quantity}</strong>
      </ListGroupItem>
    );
  }

  return (
    <ListGroup key={post.id}>
      {mediaGroupItem}
      <ListGroupItem><strong>{post.media.text}</strong></ListGroupItem>
      {quantityItem}
      <ListGroupItem>
        Post created <Moment format={'MM/DD/YY'}>{post.created_at}</Moment> {source}
        <div>{postLabel(post.status)}</div>
      </ListGroupItem>
    </ListGroup>
  );
};

SignupPost.propTypes = {
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SignupPost;
