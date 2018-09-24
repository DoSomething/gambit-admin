import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import WebSignupList from './WebSignupList';

const CampaignListContainer = props => (
  <Grid>
    <Row>
    <h3>Web signups</h3>
    <p>These campaigns send SMS confirmation messages to user if they sign up on the web.</p>
    </Row>
    <WebSignupList />
  </Grid>
);


export default CampaignListContainer;
