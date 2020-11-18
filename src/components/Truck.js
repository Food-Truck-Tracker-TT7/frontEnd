import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTruck, addFavoriteTruck } from '../store/actions';
import { useParams, Link } from 'react-router-dom';
import DisplayMenuItems from '../components/DisplayMenuItem';

function Truck(props) {
  const { id } = useParams();
  const {
    user,
    userType,
    isLoading,
    currentTruck,
    fetchTruck,
    addFavoriteTruck,
    error,
  } = props;
  const diner = userType === 'diner' ? true : false;

  useEffect(() => {
    fetchTruck(id);
  }, []);

  const truckOwner =
    userType === 'operator' && user.operatorId === currentTruck.operatorId
      ? true
      : false;

  const addFavorite = () => {
    addFavoriteTruck(user.dinerId, {
      ...currentTruck,
      truckId: currentTruck.id,
    });
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (currentTruck)
    return (
      <>
        <h2>{currentTruck.name}</h2>
        <img src={currentTruck.imageOfTruck} alt='food truck' />
        <p>Cuisine Type: {currentTruck.cuisineType}</p>
        <p>Customer Rating: {currentTruck.customerRatingsAvg}/5</p>
        <p>
          Number of Reviews:{' '}
          {currentTruck.customerRatings
            ? currentTruck.customerRatings.length
            : null}
        </p>
        <p>{error}</p>
        {diner ? <button onClick={addFavorite}>Add To Favorites</button> : null}
        <div>
          <h3>Menu</h3>
          {truckOwner ? <Link to='/addmenuitem'>Add A Menu Item</Link> : null}
          {currentTruck.menu
            ? currentTruck.menu.map(menuItem => (
                <DisplayMenuItems key={menuItem.id} menuItem={menuItem} />
              ))
            : null}
        </div>
      </>
    );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentTruck: state.currentTruck,
    isLoading: state.isLoading,
    userType: state.userType,
    error: state.error,
  };
};

export default connect(mapStateToProps, { fetchTruck, addFavoriteTruck })(
  Truck
);
