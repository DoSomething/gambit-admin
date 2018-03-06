import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Label, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import HttpRequest from './HttpRequest';

const queryString = require('query-string');
const config = require('../config');
const helpers = require('../helpers');

export default class ConversationList extends React.Component {
  static renderRow(conversation) {
    const identifier = helpers.getUserIdentifierForConversation(conversation);
    let platformLabel = '';
    if (conversation.platform !== 'sms') {
      platformLabel = <Label>{conversation.platform}</Label>;
    }
    return (
      <tr key={conversation._id}>
        <td><Moment format={config.dateFormat}>{conversation.updatedAt}</Moment></td>
        <td><Link to={`conversations/${conversation._id}`}>{identifier}</Link> {platformLabel}</td>
        <td>{conversation.campaignId}</td>
        <td>{conversation.topic}</td>
      </tr>
    );
  }

  constructor(props) {
    super(props);
    const query = {
      sort: '-updatedAt',
    };

    const queryParams = queryString.parse(window.location.search);
    const platformUserId = queryParams.platformUserId;
    if (platformUserId) {
      query.query = `{"platformUserId":{"$regex":"${platformUserId}"}}`;
    }

    this.requestUrl = helpers.getConversationsUrl(query);
  }

  render() {
    return (
      <Grid>
        <HttpRequest url={this.requestUrl}>
          {
            res => (
              <Table striped hover>
                <tbody>
                  <tr>
                    <th>Last Updated</th>
                    <th>User</th>
                    <th>Current Campaign</th>
                    <th>Topic</th>
                  </tr>
                  {res.data.map(conversation => ConversationList.renderRow(conversation))}
                </tbody>
              </Table>
            )
          }
        </HttpRequest>
      </Grid>
    );
  }
}
