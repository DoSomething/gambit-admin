import React from 'react';
import { Grid, PageHeader, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import TopicListItem from './TopicListItem';

const lodash = require('lodash');
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
          {(topics) => {
            const topicsByStatus = lodash.groupBy(topics, (topic) => {
              return topic.triggers.length ? 'active' : 'inactive';
            });
            console.log(topicsByStatus);
            return Object.keys(topicsByStatus).map((status, index) => {
              return (
                <div>
                  <h2>{status}</h2>
                  <Table>
                    <tbody>
                      {topicsByStatus[status].map(topic => (
                        <TopicListItem
                          key={topic.id}
                          topic={topic}
                        />
                      ))}                    
                    </tbody>
                  </Table>
                </div>
              )
            });
          }}
        </HttpRequest>
      </Grid>
    );
  }
}
