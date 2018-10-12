import React from 'react';
import { Table } from 'react-bootstrap';
import SignupListItem from './SignupListItem';

const SignupListContainer = (props) => (
  <Table>
    <thead>
      <tr>
        <th width={120}>Campaign</th>
        <th width={200}>Joined</th>
        <th>Posts</th>
      </tr>
    </thead>
    <tbody>
      {props.signups.map(signup => <SignupListItem signup={signup} key={signup.id} />)}
    </tbody>
  </Table>
);

export default SignupListContainer;
