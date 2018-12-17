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
  const mediaGroupItem = post.url
    ? (
      <ListGroupItem>
        <Image src={post.url} height={100} />
      </ListGroupItem>
    )
    : null;

  const quantityItem = post.quantity
    ? (
      <ListGroupItem>
        Quantity: <strong>{post.quantity}</strong>
      </ListGroupItem>
    ) : null;

  const footer = props.displayFooter
    ? (
      <ListGroupItem>
        <small>
          Created <Moment format={'MM/DD/YY'}>{post.createdAt}</Moment> {source}
        </small>
      </ListGroupItem>
    )
    : null;

  return (
    <ListGroup key={post.id}>
      {mediaGroupItem}
      <ListGroupItem>
        {post.type === 'share-social' ? <span>shared {post.action}</span> : <strong>{post.text}</strong>}
      </ListGroupItem>
      {quantityItem}
      <ListGroupItem>{postLabel(post.status)}</ListGroupItem>
      {footer}
    </ListGroup>
  );
};

SignupPost.propTypes = {
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  displayFooter: PropTypes.boolean,
};

SignupPost.defaultProps = {
  displayFooter: true,
};

export default SignupPost;
