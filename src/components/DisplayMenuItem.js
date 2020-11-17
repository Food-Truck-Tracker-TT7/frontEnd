import React from 'react';
import { connect } from 'react-redux';

function DisplayMenuItem(props) {
  const { userType, menuItem } = props;
  const {
    itemName,
    itemDescription,
    itemPrice,
    itemPhotos,
    customerRatings,
    customerRatingsAvg,
  } = menuItem;
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
    </>
  );
}
const mapStateToProps = state => {
  return {
    userType: state.userType,
  };
};

export default connect(mapStateToProps, {})(DisplayMenuItem);
