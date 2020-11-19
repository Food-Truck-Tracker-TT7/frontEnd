import styled from 'styled-components';

const StyledFavoriteTruckCard = styled.div`
  a {
    color: ${props => props.theme.textColor};
    text-decoration: none;
  }
  img {
    width: 20%;
  }
  button {
    background-color: ${props => props.theme.CTAColor};
    color: ${props => props.theme.accentColor};
  }
`;

export default StyledFavoriteTruckCard;
