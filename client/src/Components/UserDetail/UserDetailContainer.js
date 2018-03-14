import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import UserDetail from './UserDetail';

const queryString = require('query-string');
const helpers = require('../../helpers');

 class UserDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.userId;
    this.requestPath = helpers.getUserByIdPath(this.userId);
  }

  render() {
    return (
      <HttpRequest path={this.requestPath}>
        { res => <UserDetail user={res} /> }
      </HttpRequest>
    );
  }
}

UserDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ userId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default UserDetail;
