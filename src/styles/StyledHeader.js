import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid ${props => props.theme.accentColor};
  font-size: 2rem;
  background-color: ${props => props.theme.backgroundColor};
  img {
    width: 50px;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.textColor};
  }

  h1 {
    width: 50%;
    margin: 1%;
    font-size: 4rem;
  }
  nav {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2%;
    margin: 0;
  }

  nav a {
    display: inline-block;
    margin: 0 3%;
  }
`;

export default StyledHeader;
