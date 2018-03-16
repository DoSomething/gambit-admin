import React from 'react';
import PropTypes from 'prop-types';
import HttpRequest from '../HttpRequest';
import UserDetail from './UserDetail';

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
        { res => <UserDetail user={res.data} /> }
      </HttpRequest>
    );
  }
}

UserDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ userId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default UserDetailContainer;
