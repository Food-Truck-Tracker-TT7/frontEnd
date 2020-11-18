import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteTrucks } from '../store/actions';
import FavoriteTruckCard from './FavoriteTruckCard';

function DinerDashboard(props) {
  const { user, fetchFavoriteTrucks, favoriteTrucks, isLoading } = props;

  useEffect(() => {
    fetchFavoriteTrucks(user.dinerId);
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
      </div>
      <div>
        <h3>Favorite Trucks</h3>
        {favoriteTrucks
          ? favoriteTrucks.map(truck => <FavoriteTruckCard truck={truck} />)
          : null}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    favoriteTrucks: state.favoriteTrucks,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { fetchFavoriteTrucks })(
  DinerDashboard
);
