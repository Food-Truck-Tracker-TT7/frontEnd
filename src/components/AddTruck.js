import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function AddTruck() {
  //manage state for the form inputs
  const [formState, setFormSate] = useState({
    name: "",
    imageOfTruck: "",
    cuisineType: "",
    currentLocation: "",
    operatorId: "",
  });
  //managing error state
  const [errors, setErrors] = useState({
    name: "",
    imageOfTruck: "",
    cuisineType: "",
    currentLocation: "",
    operatorId: "",
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
    name: yup.string().required("Username is required"),
    imageOfTruck: yup.string().required("Password is required"),
    cuisineType: yup.string().required("Add an image for your truck"),
    currentLocation: yup.string().required("Add your trucks location"),
    operatorId: yup.string().required("Add your operator ID"),
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
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        console.log(response.data);
        setFormSate({
          username: "",
          password: "",
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div>
      <h1>Add truck page</h1>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            placeholder="Trucks Name"
            onChange={inputChange}
          />
        </label>
      </form>
    </div>
  );
}
