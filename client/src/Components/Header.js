import React from 'react';
import { Button, Form, FormControl, FormGroup, Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const location = window.location;
    const url = [location.protocol, '//', location.host].join('');
    const destination = `${url}/conversations?platformUserId=${this.state.value}`;
    window.location.href = destination;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Enter mobile number"
          />
        </FormGroup>
        <Button type="submit"><Glyphicon glyph="search" /></Button>
      </Form>
    );
  }
}

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{ this.props.siteName }</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/campaigns">Campaigns</NavItem>
        </Nav>
        <Navbar.Form pullRight>
          <SearchForm />
        </Navbar.Form>
      </Navbar>
    );
  }
}
