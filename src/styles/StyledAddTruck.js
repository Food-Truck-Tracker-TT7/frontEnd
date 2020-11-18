import styled from 'styled-components';

const StyledAddTruck = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  font-size: 2rem;
  h2 {
    font-size: 3rem;
    text-align: center;
    margin: 1%;
  }
  .error {
    color: ${props => props.theme.CTAColor};
  }
  .container {
    border: 0.1rem solid ${props => props.theme.accentColor};
    width: 30%;
    margin: 2% auto;
    padding: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      display: inline-block;
      width: 30%;
    }

    form {
      div {
        margin: 1%;
      }
      input {
        display: inline-block;
        width: 50%;
      }
    }
    button {
      background-color: ${props => props.theme.CTAColor};
      color: ${props => props.theme.textColor};
    }
  }
`;

export default StyledAddTruck;
