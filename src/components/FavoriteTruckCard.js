import React from 'react';
import { connect } from 'react-redux';
import { deleteFavoriteTruck } from '../store/actions';
import { Link } from 'react-router-dom';

function FavoriteTruckCard(props) {
  const {
    id,
    name,
    currentLocation,
    cuisineType,
    customerRatingsAvg,
    imageOfTruck,
  } = props.truck;
  const { user, deleteFavoriteTruck } = props;

  const removeFavorites = () => {
    console.log(id);
    deleteFavoriteTruck(user.dinerId, id);
  };
  return (
    <div>
      <Link to={`/truck/${id}`}>
        <h2>{name}</h2>
        <p>
          <img src={imageOfTruck} alt='food truck' width='100px' />
        </p>
      </Link>
      <p>{cuisineType}</p>
      <p>{customerRatingsAvg}</p>
      <button>Find Truck</button>
      <button onClick={removeFavorites}>Remove From Favorites</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { deleteFavoriteTruck })(
  FavoriteTruckCard
);
