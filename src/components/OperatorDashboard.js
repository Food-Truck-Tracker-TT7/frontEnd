import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  fetchOperatorTruck,
  deleteTruck,
  editTruck,
  setDarkMode,
} from '../store/actions';
import StyledOpDashboard from '../styles/StyledOpDashboard';

function OperatorDashboard(props) {
  const {
    user,
    trucksOwned,
    fetchOperatorTruck,
    deleteTruck,
    editTruck,
    setDarkMode,
    darkMode,
    update,
  } = props;
  const { push } = useHistory();
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
      <div>
        <h3>Your Trucks</h3>
        <Link to='/addtruck'>Add A Truck</Link>
        {trucksOwned ? (
          <ul>
            {trucksOwned.map(truck => (
              <li key={truck.id}>
                <Link to={`/truck/${truck.id}`}>{truck.name}</Link>
                <div>
                  <button
                    onClick={() => {
                      editTruck(truck, push);
                    }}
                  >
                    Edit Truck
                  </button>
                  <button
                    onClick={() => {
                      deleteTruck(truck.id, push);
                    }}
                  >
                    Delete Truck
                  </button>
                </div>
              </li>
            ))}
          </ul>
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
  deleteTruck,
  editTruck,
  setDarkMode,
})(OperatorDashboard);
