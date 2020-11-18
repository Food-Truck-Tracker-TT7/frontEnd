import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  deleteMenuItem,
  editMenuItem,
  addCustomerMenuItemRating,
} from '../store/actions';
import { useHistory } from 'react-router-dom';
import AddPhoto from './AddPhoto';

function DisplayMenuItem(props) {
  const {
    userType,
    menuItem,
    user,
    currentTruck,
    deleteMenuItem,
    editMenuItem,
    addCustomerMenuItemRating,
  } = props;
  const { push } = useHistory();
  const {
    id,
    itemName,
    itemDescription,
    itemPrice,
    itemPhotos,
    customerRatings,
    customerRatingsAvg,
  } = menuItem;

  const truckOwner =
    userType === 'operator' && user.operatorId === currentTruck.operatorId
      ? true
      : false;

  const diner = userType === 'diner' ? true : false;
  const [customerRating, setCustomerRating] = useState('5');

  const handleDelete = () => {
    deleteMenuItem(currentTruck.id, id);
    push(`/dashboard`);
  };

  const handleEdit = () => {
    editMenuItem(menuItem);
    push('/editmenuitem');
  };

  const handleChange = e => {
    setCustomerRating(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addCustomerMenuItemRating(
      currentTruck.id,
      id,
      user.dinerId,
      customerRating
    );
  };

  return (
    <>
      <h3>{itemName}</h3>
      <ul>
        <li>Price: ${itemPrice}</li>
        <li>Average Rating: {customerRatingsAvg}/5</li>
        <li>Number of Ratings: {customerRatings.length} </li>
        <li>Description: {itemDescription} </li>
      </ul>
      {itemPhotos.map(photo => (
        <p>
          <img src={photo} />
        </p>
      ))}
      {truckOwner ? (
        <div>
          <button onClick={handleEdit}>Edit Menu Item</button>
          <button onClick={handleDelete}>Delete Menu Item</button>
          <AddPhoto menuItem={menuItem} />
        </div>
      ) : null}
      {diner ? (
        <div>
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
    </>
  );
}
const mapStateToProps = state => {
  return {
    userType: state.userType,
    user: state.user,
    currentTruck: state.currentTruck,
  };
};

export default connect(mapStateToProps, {
  deleteMenuItem,
  editMenuItem,
  addCustomerMenuItemRating,
})(DisplayMenuItem);
