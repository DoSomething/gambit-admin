import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TopicListItem from './TopicListItem';

const helpers = require('../../helpers');

export default class TopicListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.requestPath = helpers.getTopicsPath();
  }

  render() {
    return (
      <Grid>
        <PageHeader>Topics</PageHeader>
        <HttpRequest path={this.requestPath}>
          {
            res => (
              <Table striped hover>
                <tbody>
                  <tr>
                    <th>Topic</th>
                    <th>Triggers</th>
                    <th>Post type</th>
                    <th>Campaign</th>
                  </tr>
                  {res.map(topic => (
                    <TopicListItem
                      key={topic.id}
                      topic={topic}
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
