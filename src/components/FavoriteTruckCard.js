import React from 'react';
import { connect } from 'react-redux';
import { deleteFavoriteTruck, findTruck } from '../store/actions';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function FavoriteTruckCard(props) {
  const {
    id,
    name,
    currentLocation,
    cuisineType,
    customerRatingsAvg,
    imageOfTruck,
    departureTime,
  } = props.truck;
  const { user, deleteFavoriteTruck, findTruck } = props;
  const { push } = useHistory();

  const locateTruck = () => {
    findTruck(currentLocation, push);
  };
  return (
    <Container>
      <Card style={{ width: '18rem' }}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Img src={imageOfTruck} />
          <Card.Text>
            Departure Time: {new Date(parseInt(departureTime)).toLocaleString()}
          </Card.Text>
          <Card.Text>{cuisineType}</Card.Text>
          <Card.Text>Rating: {customerRatingsAvg}</Card.Text>
          <Button variant='primary' onclick={locateTruck} className='m-2'>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { deleteFavoriteTruck, findTruck })(
  FavoriteTruckCard
);
