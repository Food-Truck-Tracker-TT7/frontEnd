import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDiner, fetchOperator } from '../store/actions';
import WelcomeStyle from '../styles/StyledWelcome';

import logolight from '../images/logolight.PNG';

function Welcome(props) {
  const { fetchDiner, fetchOperator, user, isLoggedIn } = props;
  useEffect(() => {
    const token = localStorage.getItem('token');
    const dinerId = localStorage.getItem('dinerId');
    const operatorId = localStorage.getItem('operatorId');
    if (token && dinerId) {
      fetchDiner(localStorage.getItem('dinerId'));
    } else if (token && operatorId) {
      fetchOperator(operatorId);
    }
  }, []);

  return (
    <WelcomeStyle>
      <h2>
        {isLoggedIn
          ? `Welcome ${user.username}!`
          : 'Welcome To Food Truck Tracker!'}
      </h2>
      <div>
        <img src={logolight} alt='food truck tracker' />
      </div>
      <h3>Find The Food You Love!</h3>
    </WelcomeStyle>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { fetchDiner, fetchOperator })(Welcome);
