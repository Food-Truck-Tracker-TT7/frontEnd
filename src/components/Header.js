import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions';

const Header = props => {
  const { user, isLoggedIn, logoutUser } = props;

  const logout = () => {
    localStorage.clear();
    logoutUser();
  };
  return (
    <header>
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
    </header>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);
