import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import ConversationSearchForm from './ConversationSearchForm';

class Header extends React.Component {
  render() {
    const pathname = window.location.pathname;
    const conversationsActive = (pathname.includes('conversations') || pathname.includes('requests'));
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{ this.props.siteName }</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem active={conversationsActive} eventKey={1} href="/conversations">
            Users
          </NavItem>
          <NavItem active={pathname.includes('campaigns')} eventKey={1} href="/campaigns">
            Campaigns
          </NavItem>
          <NavItem active={pathname.includes('broadcasts')} eventKey={1} href="/broadcasts">
            Broadcasts
          </NavItem>
        </Nav>
        <Navbar.Form pullRight>
          <ConversationSearchForm />
        </Navbar.Form>
      </Navbar>
    );
  }
}

Header.propTypes = {
  siteName: PropTypes.string.isRequired,
};

export default Header;
