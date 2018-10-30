import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WebSignupList from './WebSignupList';

const CampaignListContainer = () => (
  <Grid>
    <Row>
      <h3>Keywords</h3>
      <p>This section coming soon. See <Link to="/triggers">Triggers</Link> list for now.</p>
      <h3>Web signup confirmations</h3>
      <p>
        These campaigns send a SMS confirmation to a user if the signup is created on the web.
      </p>
    </Row>
    <WebSignupList />
  </Grid>
);


export default CampaignListContainer;
