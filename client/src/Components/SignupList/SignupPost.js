import React from 'react';
import { Col, Panel, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import helpers from '../../helpers';

function postLabel(status) {
  let style = 'warning';
  if (status === 'rejected') {
    style = 'danger';
  } else if (status === 'accepted') {
    style = 'success';
  }
  return <p><Label bsStyle={style}>{status}</Label></p>;
}

const SignupPost = (props) => {
  const post = props.post;
  const createdAt = <Moment format={'MM/DD/YY'}>{post.created_at}</Moment>;
  const source = post.source ? ` via ${helpers.formatSource(post.source)}` : null;
  let mediaGroupItem = null;
  if (post.media.url) {
    mediaGroupItem = (
      <ListGroupItem>
        <Image src={post.media.url} height={200} />
      </ListGroupItem>
    );
  }

  return (  
    <ListGroup key={post.id}>
      {mediaGroupItem}
      <ListGroupItem><strong>{post.media.caption}</strong></ListGroupItem>
      {post.quantity ? <ListGroupItem>Quantity: <strong>{post.quantity}</strong></ListGroupItem> : null}
      <ListGroupItem>Post created {createdAt}{source} {postLabel(post.status)}</ListGroupItem>
    </ListGroup>
  );
}

export default SignupPost;
