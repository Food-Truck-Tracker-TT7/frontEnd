import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOperatorTruck, setDarkMode } from '../store/actions';
import OwnedTruckCard from './OwnedTruckCard';

import { Card, Container, Row, Col } from 'react-bootstrap';

function OperatorDashboard(props) {
  const {
    user,
    trucksOwned,
    fetchOperatorTruck,
    setDarkMode,
    darkMode,
    update,
  } = props;
  useEffect(() => {
    fetchOperatorTruck(user.operatorId);
  }, [update]);

  return (
    <Container>
      <Card>
        <Card.Header>{user.username}</Card.Header>
        <Card.Body>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Title>Owned Trucks</Card.Title>
          <Row>
            {trucksOwned &&
              trucksOwned.map(truck => (
                <Col>
                  <OwnedTruckCard key={truck.id} truck={truck} />
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
    trucksOwned: state.trucksOwned,
    darkMode: state.darkMode,
    update: state.update,
  };
};

export default connect(mapStateToProps, {
  fetchOperatorTruck,
  setDarkMode,
})(OperatorDashboard);
