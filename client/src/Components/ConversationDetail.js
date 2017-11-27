import React from 'react';
import Request from 'react-http-request';
import { Col, Panel, Grid, Image, Label, ListGroup, ListGroupItem, PageHeader, Row, Tab, Table, Tabs} from 'react-bootstrap';
import Moment from 'react-moment';
import MessageList from './MessageList';
import RequestError from './RequestError';
import RequestLoading from './RequestLoading';

const helpers = require('../helpers');
const config = require('../config');

export default class ConversationDetail extends React.Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.match.params.conversationId;
    this.requestUrl = helpers.getConversationIdUrl(this.conversationId);
  }

  render() {
    return (
      <Request
        url={this.requestUrl}
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <RequestLoading />;
            } else if (error) {
              return <RequestError error={error} />
            } else {
              return this.renderDetail(result.body.data);
            }
          }
        }
      </Request>
    );
  }

  renderNav(conversation) {
    const numSignups = conversation.user.signups.meta.pagination.total;
    const signupsLabel = `Signups (${numSignups})`;

    return (
      <Tabs defaultActiveKey={0} animation={false} id="campaign-tabs">
        <Tab eventKey={0} title="Messages"><br />
           <MessageList conversationId={this.conversationId} />
        </Tab>
        <Tab eventKey={1} title={signupsLabel}><br />
          { this.renderSignups(conversation.user.signups) }
        </Tab>
      </Tabs>
    );
  }

  renderSignup(signup) {
    let createdAt = <Moment format={config.dateFormat}>{signup.created_at}</Moment>;
    let signupSource = null;
    if (signup.signup_source) {
      signupSource = <p>{signup.signup_source}</p>;
    }
    let posts = null;
    const numPosts = signup.posts.data.length;
    if (numPosts) {
      posts = signup.posts.data.map((post, index) => {
        console.log(post);
        let whyParticipated = null;
        if (index === numPosts - 1) {
          whyParticipated = (
            <ListGroupItem>
              <label>Why Participated:</label> {signup.why_participated}
            </ListGroupItem>
          );
        }
        return (
          <ListGroup key={post.id}>
            <ListGroupItem>
              <Image src={post.media.url} height={200} />
            </ListGroupItem>
            <ListGroupItem>
              <label>Caption:</label> {post.media.caption}
            </ListGroupItem>
            <ListGroupItem>
              <label>Quantity:</label> {signup.quantity}
            </ListGroupItem>
            {whyParticipated}
            <ListGroupItem>
              <label>Status:</label> {post.status}
            </ListGroupItem>
          </ListGroup>
        );
      });
    }
    return (
      <tr key={signup.signup_id}>
        <td>{signup.signup_id}</td>
        <td>{signup.campaign_id}</td>
        <td>{createdAt} {signupSource}</td>
        <td>{posts}</td>
      </tr>
    );
  }

  renderSignups(signups) {
    const rows = signups.data.map(signup => this.renderSignup(signup));
    return (
      <Table>
      <thead>
        <tr>
          <th width={100}>Signup</th>
          <th width={100}>Campaign</th>
          <th width={200}>Created</th>
          <th>Posts</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </Table>
    );
  }

  renderDetail(conversation) {
    let label;
    if (conversation.paused) {
      label =  <small><Label>paused</Label></small>;
    }

    return (
      <Grid>
        <PageHeader>{ conversation.platformUserId } {label}</PageHeader>
        {conversation.user ? this.renderUser(conversation.user) : ''}
        {this.renderNav(conversation)}
      </Grid>
    );
  }

  renderUser(user) {
    const lastMessagedDate = <Moment format={config.dateFormat}>{ user.last_messaged_at }</Moment>;
    const registrationDate = <Moment format="MM/DD/YY">{ user.created_at }</Moment>;
    let registrationSource;
    if (user.source) {
      registrationSource = `via ${user.source}`;
    }

    const rogueLink = <a href={user.links.rogue}>Rogue</a>;
    let mobileCommonsLink = null;
    if (user.links.mobilecommons) {
      mobileCommonsLink = <span> | <a href={user.links.mobilecommons}>Mobile Commons</a></span>;
    }

    return (
      <Panel>
        <Row>
          <Col sm={6}>
            <label>User:</label> <a href={user.links.aurora}><code>{user.id}</code></a>
          </Col>
          <Col sm={6}>
            <label>SMS status:</label> {user.sms_status}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <label>Email:</label> {user.email}
          </Col>
          <Col sm={6}>
            <label>Last inbound message:</label> {lastMessagedDate}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <label>Joined:</label> {registrationDate} {registrationSource}
          </Col>
          <Col sm={6}>
            <label>Profiles:</label> <a href={user.links.aurora}>Aurora</a> | {rogueLink} {mobileCommonsLink}
          </Col>
        </Row>
      </Panel>
    );
  }
}
