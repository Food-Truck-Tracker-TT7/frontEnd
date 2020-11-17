import React from 'react';
import { connect } from 'react-redux';

function DinerDashboard(props) {
  const { user } = props;

  return (
    <>
      <div>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
      </div>
      <div>
        <h3>Favorite Trucks</h3>
        {user.favoriteTrucks ? (
          <ul>
            {user.favoriteTrucks.map(truck => {
              <li>{truck.name}</li>;
            })}
          </ul>
        ) : (
          <p>No favorite trucks yet!</p>
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

export default connect(mapStateToProps, {})(DinerDashboard);
