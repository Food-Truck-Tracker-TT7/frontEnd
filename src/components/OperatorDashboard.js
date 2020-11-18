import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchOperatorTruck, deleteTruck } from '../store/actions';

function OperatorDashboard(props) {
  const { user, trucksOwned, fetchOperatorTruck, deleteTruck } = props;
  const { push } = useHistory();
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
                <button
                  onClick={() => {
                    deleteTruck(truck.id, push);
                  }}
                >
                  Delete Truck
                </button>
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

export default connect(mapStateToProps, { fetchOperatorTruck, deleteTruck })(
  OperatorDashboard
);
