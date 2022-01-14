import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchTruck,
  addFavoriteTruck,
  addCustomerRating,
} from "../store/actions";
import { useParams, useHistory } from "react-router-dom";
import DisplayMenuItems from "../components/DisplayMenuItem";

import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";

function Truck(props) {
  const { id } = useParams();
  const {
    user,
    userType,
    currentTruck,
    fetchTruck,
    addFavoriteTruck,
    error,
    addCustomerRating,
    update,
  } = props;
  const diner = userType === "diner" ? true : false;
  const truckOwner =
    userType === "operator" && user.operatorId === currentTruck.operatorId
      ? true
      : false;

  useEffect(() => {
    fetchTruck(id);
  }, [update]);

  const { push } = useHistory();

  const addFavorite = () => {
    addFavoriteTruck(user.dinerId, currentTruck.id);
  };

  const handleChange = (e) => {
    e.preventDefault();
    addCustomerRating(currentTruck.id, user.dinerId, e.target.value);
  };

  return (
    <Container>
      <Card>
        <Card.Header>{currentTruck.name}</Card.Header>
        <Card.Body>
          <Card.Img src={currentTruck.imageOfTruck} />
          <Card.Text>Cuisine Type: {currentTruck.cuisineType}</Card.Text>
          <Card.Text>
            Customer Rating:{" "}
            {currentTruck.customerRatingsAvg
              ? currentTruck.customerRatingsAvg
              : "N/A"}
          </Card.Text>
          <Card.Text>
            Number of Reviews:{" "}
            {currentTruck.customerRatings
              ? currentTruck.customerRatings.length
              : 0}
          </Card.Text>
          {diner && (
            <Button onClick={addFavorite} className="my-2">
              Add To Favorites
            </Button>
          )}
          <Card.Text>Review Truck</Card.Text>
          {diner && (
            <Form.Select onChange={handleChange} className="my-2">
              <option value="1">1 - Worst</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 - Best</option>
            </Form.Select>
          )}
          <Card.Text>
            Departure Time:{" "}
            {new Date(parseInt(currentTruck.departureTime)).toLocaleString()}
          </Card.Text>
          <Card.Title>Menu</Card.Title>
          {truckOwner && (
            <Button
              variant="primary"
              className="my-2"
              onClick={() => {
                push("/addmenuitem");
              }}
            >
              Add Menu Item
            </Button>
          )}
          <Row>
            {currentTruck.menu &&
              currentTruck.menu.map((menuItem) => (
                <Col key={menuItem.id}>
                  <DisplayMenuItems menuItem={menuItem} />
                </Col>
              ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentTruck: state.currentTruck,
    userType: state.userType,
    error: state.error,
    update: state.update,
  };
};

export default connect(mapStateToProps, {
  fetchTruck,
  addFavoriteTruck,
  addCustomerRating,
})(Truck);
