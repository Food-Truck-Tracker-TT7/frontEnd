import React from 'react';
import { connect } from 'react-redux';

function OperatorDashboard(props) {
  const { user } = props;
  return (
    <>
      <div>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
      </div>
      <div>
        <h3>Your Trucks</h3>
        {user.trucksOwned ? (
          <ul>
            {user.trucksOwned.map(truck => {
              <li>{truck.name}</li>;
            })}
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
  };
};

export default connect(mapStateToProps, {})(OperatorDashboard);
