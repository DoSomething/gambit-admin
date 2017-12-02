import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import ConversationSearchForm from './ConversationSearchForm';

class Header extends React.Component {
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
