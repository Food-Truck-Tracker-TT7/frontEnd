import styled from 'styled-components';

const StyledOpDashboard = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  box-sizing: border-box;
  * {
    width: 98vw;
    /* border: 1px solid green; */
  }
  h2 {
    text-align: center;
    font-size: 3.8rem;
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
  }
  a {
    text-decoration: underline dotted ${(props) => props.theme.accentColor};
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.4rem;
`;

export default StyledOpDashboard;