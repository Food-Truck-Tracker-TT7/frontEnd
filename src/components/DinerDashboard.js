import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteTrucks } from '../store/actions';
import FavoriteTruckCard from './FavoriteTruckCard';

import { Card, Container, Row, Col } from 'react-bootstrap';

function DinerDashboard(props) {
  const { user, fetchFavoriteTrucks, favoriteTrucks, isLoading } = props;

  useEffect(() => {
    fetchFavoriteTrucks(user.dinerId);
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Container fluid='md' className='text-center'>
      <Card>
        <Card.Header>{user.username}</Card.Header>
        <Card.Body>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Title>Favorite Trucks</Card.Title>
          <Row className='d-flex justify-content-center'>
            {favoriteTrucks &&
              favoriteTrucks.map(truck => (
                <Col key={truck.id} md={4}>
                  <FavoriteTruckCard truck={truck} />
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
  };
};

export default connect(mapStateToProps, { fetchFavoriteTrucks })(
  DinerDashboard
);
