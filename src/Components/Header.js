import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const siteName = process.env.SITE_NAME || 'Gambit Local';

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">{ siteName }</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/conversations">Conversations</NavItem>
    </Nav>
  </Navbar>
);

export default Header
