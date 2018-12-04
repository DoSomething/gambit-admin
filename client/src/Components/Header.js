import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import ConversationSearchForm from './ConversationSearchForm';

class Header extends React.Component {
  render() {
    const pathname = window.location.pathname;
    const activeUsers = (pathname.includes('users') || pathname.includes('requests') || pathname.includes('draft'));
    const activeCampaigns = (pathname.includes('campaigns') || pathname.includes('topics'));
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{ this.props.siteName }</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown active={activeUsers} eventKey={1} title="Users" id="users-nav-dropdown">
            <MenuItem eventKey={1.1} href="/users">Conversation last updated</MenuItem>
            <MenuItem eventKey={1.2} href="/draftSubmissions">Draft photo posts</MenuItem>
          </NavDropdown>
          <NavItem active={activeCampaigns} eventKey={2} href="/campaigns">
            Campaigns
          </NavItem>
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
