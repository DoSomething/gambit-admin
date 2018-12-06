import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import ConversationSearchForm from './ConversationSearchForm';

class Header extends React.Component {
  render() {
    const pathname = window.location.pathname;
    // TODO: Make helpers for these:
    const activeUsers = (pathname.includes('users') || pathname.includes('requests'));
    const activeCampaigns = (pathname.includes('campaigns') || pathname.includes('topics') || pathname.includes('signups') || pathname.includes('posts') || pathname.includes('draft'));
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{ this.props.siteName }</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem active={activeUsers} eventKey={1} href="/users">
            Users
          </NavItem>
          <NavDropdown active={activeCampaigns} eventKey={2} title="Campaigns" id="users-nav-dropdown">
            <MenuItem eventKey={2.1} href="/campaigns">Current campaigns</MenuItem>
            <MenuItem eventKey={2.2} href="/signups">Signups</MenuItem>
            <MenuItem eventKey={2.3} href="/posts">Posts</MenuItem>
            <MenuItem eventKey={2.4} href="/draftSubmissions">Draft photo posts</MenuItem>
          </NavDropdown>
          <NavItem active={pathname.includes('broadcasts')} eventKey={4} href="/broadcasts">
            Broadcasts
          </NavItem>
        </Nav>
        <Navbar.Form pullRight>
          <ConversationSearchForm />
        </Navbar.Form>
        <Nav pullRight>
          <NavItem active={pathname.includes('triggers')} eventKey={3} href="/triggers">
            Admin
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
  siteName: PropTypes.string.isRequired,
};

export default Header;
