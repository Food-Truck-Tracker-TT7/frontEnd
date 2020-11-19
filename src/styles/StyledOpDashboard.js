import styled from 'styled-components';

const StyledOpDashboard = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  box-sizing: border-box;
  h2 {
    text-align: center;
    font-size: 3.8rem;
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    margin: 1%;
  }
  a {
    text-decoration: underline dotted ${props => props.theme.accentColor};
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.4rem;
  .dark-mode__toggle {
    display: inline-block;
    background: ${props => props.theme.accentColor};
    border-radius: 50px;
    border: 1px solid black;
    height: 20px;
    position: relative;
    width: 40px;
    margin: 0 auto;
  }

  .toggle {
    background: ${props => props.theme.CTAColor};
    border-radius: 50px;
    height: 18px;
    left: 0;
    position: absolute;
    transition: 0.2s;
    width: 20px;
  }

  .toggled {
    left: 18px;
  }
`;

export default StyledOpDashboard;
