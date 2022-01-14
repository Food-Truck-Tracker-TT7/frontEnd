import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions';

import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = props => {
  const { isLoggedIn, logoutUser } = props;

  const logout = () => {
    logoutUser();
  };

  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Food Truck Tracker</Navbar.Brand>
        {isLoggedIn ? (
          <Nav className='me-auto'>
            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link href='/map'>Map</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className='me-auto'>
            <Nav.Link href='/signup'>Sign Up</Nav.Link>
            <Nav.Link href='/login'>Log In</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>

    // <Container>
    //   <Row>
    //     <Col>
    //       <Link to='/'>Food Truck Tracker</Link>
    //     </Col>
    //     {isLoggedIn ? (
    //       <Col>
    //         <Row>
    //           <Col>
    //             <Link to='/dashboard'>Dashboard</Link>
    //           </Col>
    //           <Col>
    //             <Link to='/map'>Map</Link>
    //           </Col>
    //           <Col>
    //             <Link to='/' onClick={logout}>
    //               Logout
    //             </Link>
    //           </Col>
    //         </Row>
    //       </Col>
    //     ) : (
    //       <nav>
    //         <Link to='/login'>Login</Link>
    //         <Link to='/signup'>Sign Up</Link>
    //       </nav>
    //     )}
    //   </Row>
    // </Container>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
