//* set up yup validation and type to submitBTN
//* create state for error messages
//* populate informative error message


import React, {useState} from 'react';
import * as yup from 'yup';

export default function Signup() {
  const initialState = { username: '', password: '', email: '', usertype: ''};
  const [radioBtnState,setRadioBtnState] = useState(true); 
  const [signupInput, setSignupInput] = useState(initialState);
  const [ submitBtn, setSubmitBtn] = useState(false);
  console.log(signupInput);

  const onChangeFunc = (e) => {
    const typeOfValue = e.target.type === 'radio' ? e.target.id : e.target.value
    setSignupInput({ ...signupInput, [e.target.name]: typeOfValue });
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();
    setSignupInput(initialState);
  }

  // //TODO: yup error state 
  // const formSchema = yup.object().shape({
  //   username: yup.string().required(),
  //   password: yup.string().required(),
  //   email: yup.string().email().required(),
  // })

  return (
    <>
      <div>Signup Page</div>
      <form onSubmit={onSubmitFunc}>
        <label htmlFor="usertype"> Diner
          <input type="radio" name='usertype' id='diner' value={radioBtnState} checked={signupInput.usertype === 'diner' ? true : false} onChange={onChangeFunc}/>
        </label> {}
        <label htmlFor="usertype"> Operator
          <input type="radio" name='usertype' id='operator' value={radioBtnState} checked={signupInput.usertype === 'operator' ? true : false} onChange={onChangeFunc}/>
        </label>
        <br />
        <label htmlFor="username">
          {"Username"}
          <input
            type="text"
            id="username"
            name="username"
            value={signupInput.username}
            onChange={onChangeFunc}
          />
        </label>
        <br />
        <label htmlFor="password">
          {"Password"}
          <input
            type="text"
            id="password"
            name="password"
            value={signupInput.password}
            onChange={onChangeFunc}
          />
        </label>
        <br />
        <label htmlFor="email">
          {"Email"}
          <input
            type="email"
            id="email"
            name="email"
            value={signupInput.email}
            onChange={onChangeFunc}
          />{" "}
        </label>
        <br/>
        <button disabled={submitBtn}>Submit</button>
      </form>
    </>
  );
}
