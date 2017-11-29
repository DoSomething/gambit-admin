import React from 'react';
import { Col, Panel, Grid, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import HttpRequest from './HttpRequest';

const helpers = require('../helpers');
const config = require('../config');

class ConversationDetail extends React.Component {
  static postLabel(status) {
    let style = 'warning';
    if (status === 'rejected') {
      style = 'danger';
    } else if (status === 'accepted') {
      style = 'success';
    }
    return <Label bsStyle={style}>{status}</Label>;
  }

  static renderSignup(signup) {
    const signupDate = <Moment format={'MM/DD/YY'}>{signup.created_at}</Moment>;
    let signupSource = null;
    if (signup.signup_source) {
      signupSource = `via ${signup.signup_source}`;
    }

    let posts = null;
    const numPosts = signup.posts.data.length;
    if (numPosts) {
      posts = signup.posts.data.map((post, index) => {
        const postDate = <Moment format={'MM/DD/YY'}>{post.created_at}</Moment>;
        let postSource = null;
        if (post.source) {
          postSource = ` via ${post.source}`;
        }
        const status = ConversationDetail.postLabel(post.status);

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
    return (
      <tr key={signup.signup_id}>
        <td>
          <strong><a href={signup.url}>{signup.signup_id}</a></strong>
          <div>{signupDate} {signupSource}</div>
        </td>
        <td>{campaignLink}</td>
        <td>{posts}</td>
      </tr>
    );
  }

  static renderSignups(signups) {
    const rows = signups.data.map(signup => ConversationDetail.renderSignup(signup));
    return (
      <Table>
        <thead>
          <tr>
            <th width={250}>Signup</th>
            <th width={150}>Campaign</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }

  static renderUser(user) {
    const lastMessagedDate = <Moment format={config.dateFormat}>{ user.last_messaged_at }</Moment>;
    const registrationDate = <Moment format="MM/DD/YY">{ user.created_at }</Moment>;
    let registrationSource;
    if (user.source) {
      registrationSource = `via ${user.source}`;
    }
    const auroraLink = <a href={user.links.aurora}>Aurora</a>;
    const rogueLink = <a href={user.links.rogue}>Rogue</a>;
    let mobileCommonsLink = null;
    if (user.links.mobilecommons) {
      mobileCommonsLink = <span> | <a href={user.links.mobilecommons}>Mobile Commons</a></span>;
    }

    return (
      <Panel>
        <Row>
          <Col sm={6}>
            <strong>User:</strong> <a href={user.links.aurora}><code>{user.id}</code></a>
          </Col>
          <Col sm={6}>
            <strong>SMS status:</strong> {user.sms_status}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Email:</strong> {user.email}
          </Col>
          <Col sm={6}>
            <strong>Last inbound message:</strong> {lastMessagedDate}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Joined:</strong> {registrationDate} {registrationSource}
          </Col>
          <Col sm={6}>
            <strong>Profiles:</strong> {auroraLink}  | {rogueLink} {mobileCommonsLink}
          </Col>
        </Row>
      </Panel>
    );
  }

  constructor(props) {
    super(props);

    this.conversationId = this.props.match.params.conversationId;
    this.requestUrl = helpers.getConversationIdUrl(this.conversationId);
  }

  renderNav(conversation) {
    let signupsTab = null;
    if (conversation.user) {
      const numSignups = conversation.user.signups.meta.pagination.total;
      const signupsLabel = `Signups (${numSignups})`;
      signupsTab = (
        <Tab eventKey={1} title={signupsLabel}><br />
          { ConversationDetail.renderSignups(conversation.user.signups) }
        </Tab>
      );
    }

    return (
      <Tabs defaultActiveKey={0} animation={false} id="campaign-tabs">
        <Tab eventKey={0} title="Messages"><br />
          <MessageList conversationId={this.conversationId} />
        </Tab>
        {signupsTab}
      </Tabs>
    );
  }

  renderDetail(conversation) {
    let label;
    if (conversation.paused) {
      label = <small><Label>paused</Label></small>;
    }

    return (
      <Grid>
        <PageHeader>{ conversation.platformUserId } {label}</PageHeader>
        {conversation.user ? ConversationDetail.renderUser(conversation.user) : ''}
        {this.renderNav(conversation)}
      </Grid>
    );
  }

  render() {
    return (
      <HttpRequest url={this.requestUrl}>
        { res => this.renderDetail(res.data) }
      </HttpRequest>
    );
  }
}

ConversationDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ conversationId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default ConversationDetail;
