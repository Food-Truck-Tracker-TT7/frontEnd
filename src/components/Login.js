import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import axios from "axios";

export default function Login() {
  //manage state for the form inputs
  const [formState, setFormSate] = useState({
    username: "",
    password: "",
    // accountType: "",
  });
  //managing error state
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    // accountType: "",
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
    console.log(event.target.name);
    console.log(event.target.value);

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
    //post takes url and what we want to post to the api
    axios.post("https://reqres.in/api/users", formState).then((response) => {
      console.log(response.data);
      setFormSate({
        username: "",
        password: "",
      });
    });
  };

  return (
    <div>
      <p>Log In</p>
      <form onSubmit={formSubmit}>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            name="username"
            value={formState.username}
            placeholder="USERNAME"
            onChange={inputChange}
          />
          {errors.username.length > 0 ? <p>{errors.username}</p> : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            placeholder="PASSWORD"
            onChange={inputChange}
          />
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
        {/* not sure if log in page needs to a section for either diner or operator */}
        {/* <label htmlFor="accountType">
          Diner or Operator
          <select
            name="accountType"
            id="accountType"
            value={formState.accountType}
            onChange={inputChange}
          >
            <option value="">Select</option>
            <option value="diner">Diner</option>
            <option value="operator">Operator</option>
          </select>
        </label> */}
        <button type="submit" disabled={buttonDisabled}>
          Log In
        </button>
        <Link to="/signup">Not a member?</Link>
        <Link to="/">Home Page</Link>
      </form>
    </div>
  );
}
