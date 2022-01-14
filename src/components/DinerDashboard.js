import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteTrucks, setDarkMode } from '../store/actions';
import FavoriteTruckCard from './FavoriteTruckCard';

import { Card, Container, Row, Col } from 'react-bootstrap';

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

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Container>
      <Card>
        <Card.Header>{user.username}</Card.Header>
        <Card.Body>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Title>Favorite Trucks</Card.Title>
          <Row>
            {favoriteTrucks &&
              favoriteTrucks.map(truck => (
                <Col>
                  <FavoriteTruckCard key={truck.id} truck={truck} />
                </Col>
              ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
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
