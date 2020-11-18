import styled from 'styled-components';

const StyledSignup = styled.div`
display:flex;
flex-direction: column;
align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  font-size: 1.6rem;
  *{
    padding: .25rem;
    margin: .25rem;
    /* border: 1px solid tomato; */
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }
  .radio{
    display: block;
  }
  .inputs{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2{
    font-size: 3.2rem;
    text-align: center;
  }
  input{
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
  }
  button {
    background-color: ${(props) => props.theme.CTAColor};
    color: ${(props) => props.theme.whiteColor}
  }
  label{
    margin-right: 1rem;
  }
`
export default StyledSignup;

// ${(props) => props.theme.CTAColor}