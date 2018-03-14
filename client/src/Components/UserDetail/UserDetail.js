import React from 'react';
import { Col, Panel, Grid, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import MessageList from '../MessageList/MessageListContainer';
import HttpRequest from '../HttpRequest';

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

function renderSignup(signup) {
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
}

function renderSignups(signups) {
  const rows = signups.data.map(signup => renderSignup(signup));
  return (
    <Table>
      <thead>
        <tr>
          <th width={120}>Campaign</th>
          <th width={200}>Joined</th>
          <th>Posts</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
}

function renderUser(user) {
  console.log(user);
  const lastMessagedDate = <Moment format={config.dateFormat}>{ user.last_messaged_at }</Moment>;
  const registrationDate = <Moment format="MM/DD/YY">{ user.created_at }</Moment>;
  let registrationSource;
  if (user.source) {
    registrationSource = `via ${helpers.formatSource(user.source)}`;
  }
  let address;
  let addressSource;
  if (user.addr_city) {
    address = `${user.addr_city}, ${user.addr_state} ${user.addr_zip}`;
  }
  if (user.addr_source) {
    addressSource = `via ${user.addr_source}`;
  }

  return (
    <Panel>
      <Row>
        <Col sm={6}>
          <strong>Mobile:</strong> {user.mobile}
        </Col>
        <Col sm={6}>
          <strong>SMS Status:</strong> {user.sms_status}
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <strong>Email:</strong> {user.email}
        </Col>
        <Col sm={6}>
          <strong>SMS Last Inbound:</strong> {lastMessagedDate}
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <strong>Address:</strong> {address} {addressSource}
        </Col>
        <Col sm={6}>
          <strong>Links:</strong> <a href={user.links.aurora}>Aurora</a>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <strong>Member Since:</strong> {registrationDate} {registrationSource}
        </Col>
      </Row>
    </Panel>
  );
}

function renderNav(conversation) {
  let signupsTab = null;
  // if (conversation.user) {
  //   const numSignups = conversation.user.signups.meta.pagination.total;
  //   const signupsLabel = `Signups (${numSignups})`;
  //   signupsTab = (
  //     <Tab eventKey={1} title={signupsLabel}><br />
  //       { renderSignups(conversation.user.signups) }
  //     </Tab>
  //   );
  // }

  return (
    <Tabs defaultActiveKey={0} animation={false} id="campaign-tabs">
      <Tab eventKey={0} title="Messages"><br />
        <MessageList conversationId={this.user.conversations.data[0]._id} />
      </Tab>
      {signupsTab}
    </Tabs>
  );
}


const UserDetail = (props) => {
  return (
    <Grid>
      <PageHeader>
        {props.user.id}
      </PageHeader>
      {renderUser(props.user)}
    </Grid>
  );
}

UserDetail.propTypes = {
  user: PropTypes.shape.isRequired,
};

export default UserDetail;
