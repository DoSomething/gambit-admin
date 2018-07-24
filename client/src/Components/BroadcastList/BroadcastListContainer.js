import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import BroadcastListItem from './BroadcastListItem';

const helpers = require('../../helpers');

export default class BroadcastListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.requestPath = helpers.getBroadcastsPath();
  }

  render() {
    return (
      <Grid>
        <HttpRequest path={this.requestPath} description="broadcasts">
          {
            res => (
              <Table>
                <tbody>
                  {res.data.map(broadcast => (
                    <BroadcastListItem
                      key={broadcast.id}
                      broadcast={broadcast}
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
