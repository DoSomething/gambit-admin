import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import ConversationListItem from './ConversationListItem';

const queryString = require('query-string');
const helpers = require('../../helpers');

export default class ConversationListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.requestPath = helpers.getConversationsPath();
    this.requestQuery = {
      sort: '-updatedAt',
    };
    const queryParams = queryString.parse(window.location.search);
    const platformUserId = queryParams.platformUserId;
    if (platformUserId) {
      this.requestQuery.query = `{"platformUserId":{"$regex":"${platformUserId}"}}`;
    }
  }

  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath} query={this.requestQuery} description="conversations">
          {
            res => (
              <Table striped hover>
                <tbody>
                  <tr>
                    <th>Last Message</th>
                    <th>User</th>
                    <th>Campaign</th>
                    <th>Topic</th>
                  </tr>
                  {res.data.map(conversation => (
                    <ConversationListItem
                      key={conversation._id}
                      conversation={conversation}
                    />
                  ))}
                </tbody>
              </Table>
            )
          }
        </HttpRequest>
      </Grid>
    );
  }
}
