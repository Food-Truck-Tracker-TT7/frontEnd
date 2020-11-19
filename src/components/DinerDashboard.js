import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteTrucks, setDarkMode } from '../store/actions';
import FavoriteTruckCard from './FavoriteTruckCard';
import StyledDinerDashboard from '../styles/StyledDinerDashboard';

function DinerDashboard(props) {
  const {
    user,
    fetchFavoriteTrucks,
    favoriteTrucks,
    isLoading,
    darkMode,
    setDarkMode,
  } = props;

  useEffect(() => {
    fetchFavoriteTrucks(user.dinerId);
  }, []);

  const toggleMode = () => {
    if (darkMode) {
      setDarkMode();
      localStorage.removeItem('darkmode');
    } else {
      setDarkMode();
      localStorage.setItem('darkmode', 'true');
    }
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <StyledDinerDashboard>
      <div className='dinerinfo'>
        <h2>{user.username}</h2>
        <p>email: {user.email}</p>
        <p>Choose Your Theme:</p>
        <div>
          Light Mode
          <div className='dark-mode__toggle'>
            <div
              onClick={toggleMode}
              className={darkMode ? 'toggle toggled' : 'toggle'}
            />
          </div>
          Dark Mode
        </div>
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
    darkMode: state.darkMode,
  };
};

export default connect(mapStateToProps, { fetchFavoriteTrucks, setDarkMode })(
  DinerDashboard
);
