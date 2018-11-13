import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import ConversationSearchForm from './ConversationSearchForm';

class Header extends React.Component {
  render() {
    const pathname = window.location.pathname;
    const activeUsers = (pathname.includes('users') || pathname.includes('requests'));
    const activeCampaigns = (pathname.includes('campaigns') || pathname.includes('topics'));
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
