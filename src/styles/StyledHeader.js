import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  font-size: 1.6rem;
  background-color: ${props => props.theme.blackColor};

  a {
    text-decoration: none;
    color: ${props => props.theme.whiteColor};
  }

  h1 {
    width: 50%;
    padding: 0 1%;
    margin: 0;
    font-size: 4rem;
  }
  nav {
    width: 15%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2%;
    margin: 0;
  }

  nav a {
    display: inline-block;
    margin: 0 1%;
  }
`;

export default StyledHeader;
