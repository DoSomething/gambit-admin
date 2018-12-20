import React from 'react';
import { Button, Grid, Jumbotron } from 'react-bootstrap';

const Login = () => (
  <Grid>
    <Jumbotron>
      <center>
        <Button
          bsStyle="primary"
          bsStyle="info"
          bsSize="large"
          href="http://localhost:3000/auth/login"
        >
          Login
        </Button>
      </center>
    </Jumbotron>
  </Grid>
);

export default Login;
