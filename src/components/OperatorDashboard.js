import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOperatorTruck, setDarkMode } from '../store/actions';
import StyledOpDashboard from '../styles/StyledOpDashboard';
import OwnedTruckCard from './OwnedTruckCard';

function OperatorDashboard(props) {
  const {
    user,
    trucksOwned,
    fetchOperatorTruck,
    setDarkMode,
    darkMode,
    update,
  } = props;
  useEffect(() => {
    fetchOperatorTruck(user.operatorId);
  }, [update]);
  const toggleMode = () => {
    if (darkMode) {
      setDarkMode();
      localStorage.removeItem('darkmode');
    } else {
      setDarkMode();
      localStorage.setItem('darkmode', 'true');
    }
  };
  return (
    <StyledOpDashboard>
      <div>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
        <p>Choose Your Theme:</p>
        <div>
          Light Mode
          <div className='dark-mode__toggle'>
            <div
              onClick={toggleMode}
              className={darkMode ? 'toggle toggled' : 'toggle'}
            />
          </div>
          Dark Mode
        </div>
      </div>
      <h3>Your Trucks</h3>
      <Link to='/addtruck'>Add A Truck</Link>
      <div className='trucklist'>
        {trucksOwned ? (
          trucksOwned.map(truck => (
            <OwnedTruckCard key={truck.id} truck={truck} />
          ))
        ) : (
          <p>No trucks yet!</p>
        )}
      </div>
    </StyledOpDashboard>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    trucksOwned: state.trucksOwned,
    darkMode: state.darkMode,
    update: state.update,
  };
};

export default connect(mapStateToProps, {
  fetchOperatorTruck,
  setDarkMode,
})(OperatorDashboard);
