import React from 'react';
import { Table } from 'react-bootstrap';
import HttpRequest from '../HttpRequest';
import WebSignupListItem from './WebSignupListItem';

const contentfulQuery = {
  content_type: 'campaign',
  'fields.webSignup[exists]': true,
};

const WebSignupListContainer = () => (
  <Table>
    <tbody>
      <HttpRequest path="contentfulEntries" query={contentfulQuery}>
        {res => res.map(item => <WebSignupListItem key={item.raw.sys.id} data={item} />)}
      </HttpRequest>
    </tbody>
  </Table>
);


export default WebSignupListContainer;
