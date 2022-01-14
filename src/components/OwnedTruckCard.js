import React from 'react';
import { connect } from 'react-redux';
import { deleteTruck, editTruck } from '../store/actions';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function OwnedTruckCard(props) {
  const { truck, deleteTruck, editTruck } = props;
  const { push } = useHistory();
  return (
    <Container>
      <Card style={{ width: '18rem' }}>
        <Card.Header>{truck.name}</Card.Header>
        <Card.Body>
          <Card.Img src={truck.imageOfTruck} />
          <Card.Text>
            Departure Time:{' '}
            {new Date(parseInt(truck.departureTime)).toLocaleString()}
          </Card.Text>
          <Button
            variant='primary'
            onClick={() => {
              editTruck(truck, push);
            }}
            className='m-2'
          >
            Edit
          </Button>
          <Button variant='primary' onclick={deleteTruck} className='m-2'>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default connect(() => {}, { deleteTruck, editTruck })(OwnedTruckCard);
