import styled from 'styled-components';
const WelcomeStyle = styled.div`
  font-size: 2.4rem;
  padding: 1rem;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
  }
  img {
    border-radius: 50%;
    width: 50%;
  }

  h2 {
    font-size: 4rem;
    margin: 2%;
  }
  h3 {
    margin: 2%;
  }
`;

export default WelcomeStyle;
