import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { loginUser } from "../store/actions";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";

function Login(props) {
  const { loginUser, error } = props;
  const { push } = useHistory();
  //manage state for the form inputs
  const [formState, setFormSate] = useState({
    username: "",
    password: "",
  });
  //managing error state
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  //submit state checks whether the form can be submited
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //inline validation on one key/value pair at a time
  const validateChange = (event) => {
    //.reach is in the yup library
    //returns a promise
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        //value from valid comes from .validate
        //if the input is passing formSchema
        setErrors({ ...errors, [event.target.name]: "" });
      })
      .catch((error) => {
        //if the input is breakign formSchema
        //capture the error message
        setErrors({ ...errors, [event.target.name]: error.errors[0] });
      });

    //need to call this function the onChange function = inputChnage
  };

  //onChange function
  const inputChange = (event) => {
    //allows us to pass around synthertic events
    event.persist();

    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value,
    };

    //event is being passed in to the validateChange function i created
    validateChange(event);

    setFormSate(newFormState);
  };

  //form schema set of rules
  //object is coming from yup library
  //shape function takes in an object {}
  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    // accountType: yup.string().oneOf(["diner", "operator"]),
  });

  useEffect(() => {
    //isValid comes from the yup library
    //checking formSchema against formState
    //comparing the keys and the values
    //returns a promise
    formSchema.isValid(formState).then((valid) => {
      //we can check the process has been completed
      setButtonDisabled(!valid);
    });
  }, [formState]);
  //do something every time formState changes

  //onSubmit function
  const formSubmit = (event) => {
    event.preventDefault();
    loginUser(
      {
        username: formState.username.trim(),
        password: formState.password,
      },
      push
    );
  };

  return (
    <Container fluid="md">
      <Form onSubmit={formSubmit} className="m-3">
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="username"
                label="Username"
                className="my-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  id="username"
                  name="username"
                  value={formState.username}
                  onChange={inputChange}
                  isInvalid={errors.username}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invlaid" className="text-danger m-0">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <FloatingLabel
              controlId="password"
              label="Password"
              className="my-2"
            >
              <Form.Control
                type="password"
                placeholder="Enter password"
                id="password"
                name="password"
                value={formState.password}
                onChange={inputChange}
                isInvalid={errors.password}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invlaid" className="text-danger">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={2}>
            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={buttonDisabled}
            >
              Log In
            </Button>
          </Col>
        </Row>
      </Form>

      {/* <p className='loginTitle'>Log In</p>
      <p>{error}</p>
      <form onSubmit={formSubmit}>
        <div className='loginForm'>
          <label htmlFor='username'>
            Username
            <input
              id='username'
              name='username'
              value={formState.username}
              onChange={inputChange}
            />
            {errors.username.length > 0 ? <p>{errors.username}</p> : null}
          </label>
        </div>
        <div className='loginForm'>
          <label htmlFor='password'>
            Password
            <input
              id='password'
              name='password'
              value={formState.password}
              onChange={inputChange}
            />
            {errors.password.length > 0 ? <p>{errors.password}</p> : null}
          </label>
        </div>
        <LoginBtn type='submit' disabled={buttonDisabled}>
          Log In
        </LoginBtn>
        <p>
          <Link className='loginLink' to='/signup'>
            Not a member?
          </Link>
        </p>
        <p>
          <Link className='loginLink' to='/'>
            Home Page
          </Link>
        </p>
      </form> */}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};
export default connect(mapStateToProps, { loginUser })(Login);
