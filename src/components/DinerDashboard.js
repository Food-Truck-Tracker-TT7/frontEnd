import React from 'react';
import { connect } from 'react-redux';

function DinerDashboard(props) {
  const { user } = props;

  return (
    <>
      <div>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
        <button>Update Information</button>
      </div>
      <div>
        {/* <h3>Favorite Trucks</h3>
        <ul>
          {user.favoriteTrucks.map(truck => {
            <li>{truck.name}</li>;
          })}
        </ul> */}
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
