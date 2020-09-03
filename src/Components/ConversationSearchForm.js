import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, Glyphicon } from 'react-bootstrap';


const ConversationSearchForm = function () {
  const [searchValue, setSearchValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const location = window.location;
    const url = [location.protocol, '//', location.host].join('');
    const destination = `${url}/users?platformUserId=${searchValue}`;
    window.location.href = destination;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Enter mobile number"
        />
      </FormGroup>
      <Button type="submit">
        <Glyphicon glyph="search" />
      </Button>
    </Form>
  );
}

export default ConversationSearchForm;

