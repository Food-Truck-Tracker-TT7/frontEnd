import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions';

import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = props => {
  const { isLoggedIn, logoutUser } = props;

  const logout = () => {
    logoutUser();
  };

  const { push } = useHistory();

  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand
          onClick={() => {
            push('/');
          }}
        >
          Food Truck Tracker
        </Navbar.Brand>
        {isLoggedIn ? (
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                push('/dashboard');
              }}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                push('/map');
              }}
            >
              Map
            </Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                push('/signup');
              }}
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                push('/login');
              }}
            >
              Log In
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
