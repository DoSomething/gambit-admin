import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import ConversationSearchForm from './ConversationSearchForm';

class Header extends React.Component {
  render() {
    const appName = this.props.config.app ? this.props.config.app.name : null;
    const navbarHeader = (
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">{appName}</a>
        </Navbar.Brand>
      </Navbar.Header>
    );
    if (!this.props.user.name) {
      return (
        <Navbar>
          {navbarHeader}
        </Navbar>
      );
    }
    const pathname = window.location.pathname;
    // TODO: Make helpers for these:
    const activeUsers = (pathname.includes('users') || pathname.includes('requests'));
    const activeCampaigns = (pathname.includes('campaigns') || pathname.includes('topics') || pathname.includes('signups') || pathname.includes('posts') || pathname.includes('draft'));
    return (
      <Navbar>
        {navbarHeader}
        <Nav>
          <NavItem active={activeUsers} eventKey={1} href="/users">
            Users
          </NavItem>
          <NavDropdown active={activeCampaigns} eventKey={2} title="Campaigns" id="users-nav-dropdown">
            <MenuItem eventKey={2.1} href="/campaigns">Current campaigns</MenuItem>
            <MenuItem eventKey={2.2} href="/campaigns-ended">Ended campaigns</MenuItem>
            <MenuItem eventKey={2.3} href="/signups">Signups</MenuItem>
            <MenuItem eventKey={2.4} href="/posts">Posts</MenuItem>
            <MenuItem eventKey={2.5} href="/draftSubmissions">Draft photo posts</MenuItem>
          </NavDropdown>
          <NavItem active={pathname.includes('broadcasts')} eventKey={4} href="/broadcasts">
            Broadcasts
          </NavItem>
          <NavItem active={pathname.includes('triggers')} eventKey={4} href="/triggers">
            Triggers
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={5} title={this.props.user.name} id="users-nav-dropdown">
            <MenuItem eventKey={5.1} href={`${this.props.config.app.url}/auth/logout`}>Log out</MenuItem>
          </NavDropdown>
        </Nav>
        <Navbar.Form pullRight>
          <ConversationSearchForm />
        </Navbar.Form>
      </Navbar>
    );
  }
}

Header.propTypes = {
  config: PropTypes.object,
  user: PropTypes.object,
};

Header.defaultProps = {
  config: {},
  user: {},
};

export default Header;
