import React from 'react';

export default function FavoriteTruckCard(props) {
  const {
    name,
    currentLocation,
    cuisineType,
    customerRatingsAvg,
    imageOfTruck,
  } = props.truck;
  return (
    <div>
      <h2>{name}</h2>
      <p>
        <img src={imageOfTruck} alt='food truck' width='100px' />
      </p>
      <p>{cuisineType}</p>
      <p>{customerRatingsAvg}</p>
      <button>Find Truck</button>
    </div>
  );
}
