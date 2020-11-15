import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {
  const { user } = props;
  return (
    <header>
      <h1>Food Truck Tracker</h1>

      <nav>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sing Up</Link>
      </nav>
    </header>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {})(Header);
