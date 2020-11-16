import React, {useState} from 'react';

export default function Signup() {
  const initialState = { username: '', password: '', email: '', usertype: ''};
  const [signupInput, setSignupInput] = useState(initialState);
  const [ submitBtn, setSubmitBtn] = useState(false);
  console.log(signupInput); //!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const onChangeFunc = (e) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();
    setSignupInput(initialState);
  }

  //TODO Validate w/Yup
  return (
    <>
      <div>Signup Page</div>
      <form onSubmit={onSubmitFunc}>
        <label htmlFor="usertype"> Operator
          <input type="radio" name='usertype' id='operator' value={signupInput.usertype} onChange={onChangeFunc}/>
        </label>
        <label htmlFor="usertype"> Diner
          <input type="radio" name='usertype' id='diner' value={signupInput.usertype} onChange={onChangeFunc}/>
        </label> 
        <br />
        <label htmlFor="username">
          {"Username"}
          <input
            type="text"
            id="username"
            name="username"
            value={signupInput.username} //*what is the value of this?<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
