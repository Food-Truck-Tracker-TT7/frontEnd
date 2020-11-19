import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteTrucks } from '../store/actions';
import FavoriteTruckCard from './FavoriteTruckCard';
import StyledDinerDashboard from '../styles/StyledDinerDashboard';

function DinerDashboard(props) {
  const { user, fetchFavoriteTrucks, favoriteTrucks, isLoading } = props;

  useEffect(() => {
    fetchFavoriteTrucks(user.dinerId);
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <StyledDinerDashboard>
      <div className='dinerinfo'>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
        <h3>Favorite Trucks</h3>
        <div className='favtrucks'>
          {favoriteTrucks
            ? favoriteTrucks.map(truck => (
                <FavoriteTruckCard key={truck.id} truck={truck} />
              ))
            : null}
        </div>
      </div>
    </StyledDinerDashboard>
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
