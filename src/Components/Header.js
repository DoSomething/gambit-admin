import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{ this.props.siteName }</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/conversations">Conversations</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
