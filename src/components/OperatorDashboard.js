import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOperatorTruck } from '../store/actions';

function OperatorDashboard(props) {
  const { user, trucksOwned, fetchOperatorTruck } = props;
  useEffect(() => {
    fetchOperatorTruck(user.operatorId);
  }, []);
  return (
    <>
      <div>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
      </div>
      <div>
        <h3>Your Trucks</h3>
        <Link to='/addtruck'>Add A Truck</Link>
        {trucksOwned ? (
          <ul>
            {trucksOwned.map(truck => (
              <li>
                <Link to={`/truck/${truck.id}`}>{truck.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No trucks yet!</p>
        )}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    trucksOwned: state.trucksOwned,
  };
};

export default connect(mapStateToProps, { fetchOperatorTruck })(
  OperatorDashboard
);
