//* populate informative error message
//* set up yup validation and type to submitBTN

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";

import { addDiner, addOperator } from "../store/actions";
import stringifyLocation from "../utils/stringifyLocation";
import StyledSignup from "../styles/StyledSignup";

function Signup(props) {
  const { error, addDiner, addOperator } = props;
  const { push } = useHistory();

  const initialState = {
    username: "",
    password: "",
    email: "",
    usertype: "",
  };
  const [signupInput, setSignupInput] = useState(initialState);
  const [validationError, setValidationError] = useState({});
  const [submitBtn, setSubmitBtn] = useState(true);

  const onChangeFunc = (e) => {
    const typeOfValue =
      e.target.type === "radio" ? e.target.id : e.target.value;
    setSignupInput({ ...signupInput, [e.target.name]: typeOfValue });
    validate(e);
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();
    const newUser = {
      username: signupInput.username.trim(),
      password: signupInput.password,
      email: signupInput.email.trim(),
      currentLocation: signupInput.currentLocation,
    };
    if (signupInput.usertype === "diner") {
      addDiner(
        {
          username: signupInput.username.trim(),
          password: signupInput.password,
          email: signupInput.email.trim(),
        },
        push
      );
    } else {
      addOperator(
        {
          username: signupInput.username.trim(),
          password: signupInput.password,
          email: signupInput.email.trim(),
        },
        push
      );
    }
    setSignupInput(initialState);
  };

  const validate = (e) => {
    const typeOfValue =
      e.target.type === "radio" ? e.target.checked : e.target.value; //!I think this is e.target.checked for truthy
    yup
      .reach(formSchema, e.target.name) //reach into the formSchema object template and look for the e.target.name
      .validate(typeOfValue) //...and validate typeOfValue against fomrSchema
      .then((ifValid) => {
        setValidationError({ ...validationError, [e.target.name]: "" });
      })
      .catch((ifErr) => {
        setValidationError({
          ...validationError,
          [e.target.name]: ifErr.errors[0],
        });
      });
  };

  useEffect(() => {
    formSchema.isValid(signupInput).then((valid) => {
      setSubmitBtn(!valid);
    });
  }, [signupInput]);

  const getLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      setSignupInput({
        ...signupInput,
        currentLocation: stringifyLocation(position),
      });
    });
  };

  //*Yup validation
  const formSchema = yup.object().shape({
    username: yup.string().required("Please provide a valid username"),
    password: yup.string().required("Please provide a valid password"),
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Valid email required"),
    usertype: yup
      .string()
      .oneOf(["diner", "operator"], "Please select an account type"),
  });

  return (
    <Container fluid="md">
      <Form onSubmit={onSubmitFunc} className="m-3">
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
                  value={signupInput.username}
                  onChange={onChangeFunc}
                  isInvalid={validationError.username}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invlaid" className="text-danger m-0">
                {validationError.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form.Group>
              <FloatingLabel controlId="email" label="Email" className="my-2">
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  id="email"
                  name="email"
                  value={signupInput.email}
                  onChange={onChangeFunc}
                  isInvalid={validationError.email}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invlaid" className="text-danger m-0">
                {validationError.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form.Group>
              <FloatingLabel
                controlId="password"
                label="Password"
                className="my-2"
              >
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  value={signupInput.password}
                  onChange={onChangeFunc}
                  isInvalid={validationError.password}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invlaid" className="text-danger m-0">
                {validationError.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2 d-flex justify-content-center">
          <Col md={6}>
            <Form.Check
              inline
              type="radio"
              name="usertype"
              id="diner"
              label="Diner"
              checked={signupInput.usertype === "diner" ? true : false}
              onChange={onChangeFunc}
            />

            <Form.Check
              inline
              type="radio"
              name="usertype"
              id="operator"
              label="Operator"
              checked={signupInput.usertype === "operator" ? true : false}
              onChange={onChangeFunc}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={6}>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="my-2"
          disabled={submitBtn}
          >
          Sign Up
        </Button>
            </Col>
          </Row>
      </Form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

export default connect(mapStateToProps, { addDiner, addOperator })(Signup);
