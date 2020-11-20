import React from 'react';
import { connect } from 'react-redux';
import { deleteTruck, editTruck } from '../store/actions';
import { useHistory, Link } from 'react-router-dom';

import StyledOwnedTruckCard from '../styles/StyledOwnedTruckCard';

function OwnedTruckCard(props) {
  const { truck, deleteTruck, editTruck } = props;
  const { push } = useHistory();
  const departure = new Date(truck.departureTime);
  return (
    <StyledOwnedTruckCard>
      <Link to={`/truck/${truck.id}`}>{truck.name}</Link>
      <img src={truck.imageOfTruck} alt='food truck' />

      <p>
        Departure Time: {departure.toLocaleDateString()}{' '}
        {departure.toLocaleTimeString()}
      </p>
      <div className='buttons'>
        <button
          onClick={() => {
            editTruck(truck, push);
          }}
        >
          Edit Truck
        </button>
        <button
          onClick={() => {
            deleteTruck(truck.id, push);
          }}
        >
          Delete Truck
        </button>
      </div>
    </StyledOwnedTruckCard>
  );
}

export default connect(() => {}, { deleteTruck, editTruck })(OwnedTruckCard);
