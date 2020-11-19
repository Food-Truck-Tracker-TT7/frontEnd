import styled from 'styled-components';

const StyledMenuItem = styled.div`
  width: 25%;
  border: 0.2rem solid ${props => props.theme.accentColor};
  font-size: 1.5rem;
  margin: 2%;
  padding: 1%;
  img {
    width: 100%;
  }
  button {
    width: 50%;
  }
  h3 {
    font-size: 3rem;
  }
`;

export default StyledMenuItem;
