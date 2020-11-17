import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTruck } from '../store/actions';
import { useParams } from 'react-router-dom';
import DisplayMenuItems from '../components/DisplayMenuItem';

function Truck(props) {
  const { id } = useParams();
  const { user, userType, isLoading, currentTruck, fetchTruck } = props;

  useEffect(() => {
    fetchTruck(id);
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (currentTruck)
    return (
      <>
        <h2>{currentTruck.name}</h2>
        <p>Cuisine Type: {currentTruck.cuisineType}</p>
        <p>Customer Rating: {currentTruck.customerRatingsAvg}/5</p>
        <p>
          Number of Reviews:{' '}
          {currentTruck.customerRatings
            ? currentTruck.customerRatings.length
            : null}
        </p>
        <div>
          <h3>Menu</h3>
          {currentTruck.menu
            ? currentTruck.menu.map(menuItem => (
                <DisplayMenuItems menuItem={menuItem} />
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
  };
};

export default connect(mapStateToProps, { fetchTruck })(Truck);
