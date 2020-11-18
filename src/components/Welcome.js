import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDiner, fetchOperator } from '../store/actions';

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
    <h2>
      {isLoggedIn
        ? `Welcome ${user.username}!`
        : 'Welcome To Food Truck Tracker!'}
    </h2>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { fetchDiner, fetchOperator })(Welcome);
