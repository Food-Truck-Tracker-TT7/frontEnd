import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchTruck,
  addFavoriteTruck,
  addCustomerRating,
} from '../store/actions';
import { useParams, Link } from 'react-router-dom';
import DisplayMenuItems from '../components/DisplayMenuItem';
import Truckstyles from '../styles/StyledTruck';

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
    addCustomerRating,
    update,
  } = props;
  const diner = userType === 'diner' ? true : false;
  const truckOwner =
    userType === 'operator' && user.operatorId === currentTruck.operatorId
      ? true
      : false;

  useEffect(() => {
    fetchTruck(id);
  }, [update]);

  const [customerRating, setCustomerRating] = useState('5');

  const addFavorite = () => {
    addFavoriteTruck(user.dinerId, {
      ...currentTruck,
      truckId: currentTruck.id,
    });
  };
  const handleChange = e => {
    setCustomerRating(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addCustomerRating(currentTruck.id, user.dinerId, customerRating);
  };

  if (isLoading) return <h2>Loading...</h2>;
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
      <div>
        {diner ? (
          <div>
            <button onClick={addFavorite}>Add To Favorites</button>
            <form onSubmit={handleSubmit}>
              <label>
                Leave A Rating:
                <select
                  name='customerrating'
                  value={customerRating}
                  onChange={handleChange}
                >
                  <option value='5'>5</option>
                  <option value='4'>4</option>
                  <option value='3'>3</option>
                  <option value='2'>2</option>
                  <option value='1'>1</option>
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        ) : null}
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
    update: state.update,
  };
};

export default connect(mapStateToProps, {
  fetchTruck,
  addFavoriteTruck,
  addCustomerRating,
})(Truck);
