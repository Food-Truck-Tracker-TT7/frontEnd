import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions';

import StyledHeader from '../styles/StyledHeader';

const Header = props => {
  const { isLoggedIn, logoutUser } = props;

  const logout = () => {
    logoutUser();
  };

  return (
    <StyledHeader>
      <h1>
        <Link to='/'>Food Truck Tracker</Link>
      </h1>
      {isLoggedIn ? (
        <nav>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/map'>Map</Link>
          <Link to='/welcome' onClick={logout}>
            Logout
          </Link>
        </nav>
      ) : (
        <nav>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </nav>
      )}
    </StyledHeader>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
