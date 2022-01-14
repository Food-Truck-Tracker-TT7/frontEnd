import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  deleteMenuItem,
  editMenuItem,
  addCustomerMenuItemRating,
  deleteItemPhoto,
} from '../store/actions';
import { useHistory } from 'react-router-dom';

import AddPhoto from './AddPhoto';
import StyledMenuItem from '../styles/StyledMenuItem';

import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Carousel,
  ListGroup,
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
    deleteItemPhoto,
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
              <Carousel.Item style={{ height: '10rem' }}>
                <img className='d-block w-100' src={photo} alt='food' />
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
          <Button variant='primary' onClick={handleEdit} className='m-2'>
            Edit Item
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            Delete Item
          </Button>
        </Card.Body>
      </Card>
    </Container>

    // <StyledMenuItem>
    //   {itemPhotos.map(photo => (
    //     <div key={photo}>
    //       <img src={photo} alt='menu item' />
    //       {/* {truckOwner ? (
    //         <div>
    //           <button
    //             onClick={() => {
    //               deleteItemPhoto(currentTruck.id, id, photo);
    //             }}
    //           >
    //             Remove Photo
    //           </button>
    //         </div>
    //       ) : null} */}
    //     </div>
    //   ))}
    //   <h3>{itemName}</h3>
    //   <ul>
    //     <li>Price: ${itemPrice}</li>
    //     <li>Average Rating: {customerRatingsAvg}/5</li>
    //     <li>Number of Ratings: {customerRatings.length} </li>
    //     <li>Description: {itemDescription} </li>
    //   </ul>
    //   {truckOwner ? (
    //     <div>
    //       <button onClick={handleEdit}>Edit Menu Item</button>
    //       <button onClick={handleDelete}>Delete Menu Item</button>
    //       <AddPhoto menuItem={menuItem} />
    //     </div>
    //   ) : null}
    //   {diner ? (
    //     <div>
    //       <form onSubmit={handleSubmit}>
    //         <label>
    //           Leave A Rating:
    //           <select
    //             name='customerrating'
    //             value={customerRating}
    //             onChange={handleChange}
    //           >
    //             <option value='5'>5</option>
    //             <option value='4'>4</option>
    //             <option value='3'>3</option>
    //             <option value='2'>2</option>
    //             <option value='1'>1</option>
    //           </select>
    //         </label>
    //         <button>Submit</button>
    //       </form>
    //     </div>
    //   ) : null}
    // </StyledMenuItem>
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
  deleteItemPhoto,
})(DisplayMenuItem);
