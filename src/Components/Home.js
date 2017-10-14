import React from 'react';
import { Grid } from 'react-bootstrap';
import CampaignList from './CampaignList';

export default class Home extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <CampaignList />
      </Grid>
    );
  }
}