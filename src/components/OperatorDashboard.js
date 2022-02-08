import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOperatorTruck } from '../store/actions';
import OwnedTruckCard from './OwnedTruckCard';
import { useHistory } from 'react-router-dom';

import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function OperatorDashboard(props) {
  const { user, trucksOwned, fetchOperatorTruck, update } = props;
  useEffect(() => {
    fetchOperatorTruck(user.operatorId);
  }, [update]);

  const { push } = useHistory();

  return (
    <Container fluid='md' className='text-center'>
      <Card>
        <Card.Header>{user.username}</Card.Header>
        <Card.Body>
          <Card.Text>Email: {user.email}</Card.Text>
          <Button
            variant='primary'
            onClick={() => {
              push('/addtruck');
            }}
          >
            Add Truck
          </Button>
          <Card.Title className='m-3'>Owned Trucks</Card.Title>
          <Row className='d-flex justify-content-center'>
            {trucksOwned &&
              trucksOwned.map(truck => (
                <Col key={truck.id} md={4}>
                  <OwnedTruckCard truck={truck} />
                </Col>
              ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  trucksOwned: state.trucksOwned,
  update: state.update,
});

export default connect(mapStateToProps, {
  fetchOperatorTruck,
})(OperatorDashboard);
