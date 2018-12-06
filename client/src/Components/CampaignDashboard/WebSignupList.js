import React from 'react';
import HttpRequest from '../HttpRequest';
import WebSignupListItem from './WebSignupListItem';
import helpers from '../../helpers';

const contentfulQuery = {
  content_type: 'campaign',
  'fields.webSignup[exists]': true,
};

const WebSignupListContainer = () => (
  <HttpRequest path={helpers.getContentfulEntriesPath()} query={contentfulQuery}>
    {res => res.map(item => <WebSignupListItem key={item.raw.sys.id} data={item} />)}
  </HttpRequest>
);


export default WebSignupListContainer;
