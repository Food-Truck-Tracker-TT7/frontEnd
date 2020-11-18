import styled from 'styled-components';

const Truckstyles = styled.div`
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  box-sizing: border-box;

  *, div, ul, body, html {
    background-color: ${(props) => props.theme.backgroundColor};
    width: 100%;
    /* border: 1px solid green; */
  }
  h2 {
    text-align: center;
    font-size: 3.8rem;
    padding: 1rem 0rem;
  }
  .menuheader {
    text-align: center;
    font-size: 3.2rem;
    margin-bottom: 1rem;
  }
  li {
    padding: 0 1rem;
  }
  h3 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }
  p {
    color: ${(props) => props.theme.textColor};
    font-size: 2.2rem;
    text-align: center;
    padding: .25rem 0;
  }
  li {
    font-size: 1.8rem;
  }
  span{
    color: ${(props) => props.theme.accentColor};
  }
  a,
  button {
    /* text-decoration: underline dotted ${(props) =>
      props.theme.accentColor}; */
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.CTAColor};
    padding: .5rem;
    width: 10%;
  }
  .buttondiv{
    display: flex;
    justify-content: center;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.4rem;
`;

export default Truckstyles;