import React from 'react';
import { connect } from 'react-redux';
import {
  deleteMenuItem,
  editMenuItem,
  addCustomerMenuItemRating,
} from '../store/actions';
import { useHistory } from 'react-router-dom';

import AddPhoto from './AddPhoto';

import {
  Card,
  Container,
  Button,
  Form,
  Carousel,
  ListGroup,
  Image,
} from 'react-bootstrap';

function DisplayMenuItem(props) {
  const {
    userType,
    menuItem,
    user,
    currentTruck,
    deleteMenuItem,
    editMenuItem,
    addCustomerMenuItemRating,
  } = props;
  const {
    id,
    itemName,
    itemDescription,
    itemPrice,
    itemPhotos,
    customerRatings,
    customerRatingsAvg,
  } = menuItem;

  const { push } = useHistory();

  const truckOwner =
    userType === 'operator' && user.operatorId === currentTruck.operatorId
      ? true
      : false;

  const diner = userType === 'diner' ? true : false;

  const handleDelete = () => {
    deleteMenuItem(currentTruck.id, id);
  };

  const handleEdit = () => {
    editMenuItem(menuItem);
    push('/editmenuitem');
  };

  const handleChange = e => {
    e.preventDefault();
    addCustomerMenuItemRating(
      currentTruck.id,
      id,
      user.dinerId,
      e.target.value
    );
  };

  return (
    <Container>
      <Card style={{ width: '18rem' }}>
        <Card.Header>{itemName}</Card.Header>
        <Card.Body>
          <Carousel>
            {itemPhotos.map(photo => (
              <Carousel.Item key={photo}>
                <Image fluid src={photo} alt='food' />
              </Carousel.Item>
            ))}
          </Carousel>
          <ListGroup>
            <ListGroup.Item>Price: ${itemPrice}</ListGroup.Item>
            <ListGroup.Item>
              Average Rating: {customerRatingsAvg}
            </ListGroup.Item>
            <ListGroup.Item>
              Number of Ratings: {customerRatings.length}
            </ListGroup.Item>
            <ListGroup.Item>Description: {itemDescription}</ListGroup.Item>
            {diner && (
              <ListGroup.Item>
                Rate Menu Item
                <Form.Select onChange={handleChange} className='my-2'>
                  <option value='1'>1 - Worst</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5 - Best</option>
                </Form.Select>
              </ListGroup.Item>
            )}
          </ListGroup>
          {truckOwner && (
            <Button variant='primary' onClick={handleEdit} className='m-2'>
              Edit Item
            </Button>
          )}
          {truckOwner && (
            <Button variant='primary' onClick={handleDelete}>
              Delete Item
            </Button>
          )}
          {truckOwner && <AddPhoto menuItem={menuItem} />}
        </Card.Body>
      </Card>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    userType: state.userType,
    user: state.user,
    currentTruck: state.currentTruck,
  };
};

export default connect(mapStateToProps, {
  deleteMenuItem,
  editMenuItem,
  addCustomerMenuItemRating,
})(DisplayMenuItem);
