import styled from 'styled-components';

const Truckstyles = styled.div`
  color: ${props => props.theme.textColor};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  ul {
    background-color: ${props => props.theme.backgroundColor};
    width: 100%;
  }
  .truckImg {
    width: 30%;
  }
  h2 {
    text-align: center;
    font-size: 3.8rem;
    padding: 1rem 0rem;
  }
  .menuheader {
    width: 30%;
    text-align: center;
    font-size: 3.2rem;
    margin: 1% auto;
    color: ${props => props.theme.accentColor};
    background-color: ${props => props.theme.CTAColor};
  }
  li {
    padding: 0 1rem;
  }
  h3 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }
  p {
    color: ${props => props.theme.textColor};
    font-size: 2rem;
    text-align: center;
    padding: 0.25rem 0;
  }
  li {
    font-size: 1.8rem;
  }
  span {
    color: ${props => props.theme.accentColor};
  }
  a,
  button {
    color: ${props => props.theme.accentColor};
    background-color: ${props => props.theme.CTAColor};
    padding: 0.5rem;
    width: 40%;
  }
  .buttondiv {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .menu {
    width: 100%;
    text-align: center;
    .menuItems {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
  .dinneroptions {
    text-align: center;
    width: 30%;
    margin: 2% auto;
  }
`;

export default Truckstyles;
