import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import ConversationListItem from './ConversationListItem';

const queryString = require('query-string');
const helpers = require('../../helpers');

export default class ConversationListContainer extends React.Component {
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
