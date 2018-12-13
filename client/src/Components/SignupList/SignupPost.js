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
        <Image src={post.media.url} height={100} />
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

  const footer = props.displayFooter
    ? (
      <ListGroupItem>
        <small>
          Created <Moment format={'MM/DD/YY'}>{post.created_at}</Moment> {source}
        </small>
      </ListGroupItem>
    )
    : null;

  return (
    <ListGroup key={post.id}>
      {mediaGroupItem}
      <ListGroupItem>
        {post.type === 'share-social' ? <span>shared {post.action}</span> : <strong>{post.media.text}</strong>}
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
