import styled from 'styled-components';

const StyledDinerDashboard = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.textColor};
  .dinerinfo {
    text-align: center;
    width: 50%;
    margin: 2% auto;

    h2 {
      font-size: 3.5rem;
    }
    h3 {
      margin: 3%auto;
      color: ${props => props.theme.accentColor};
      background-color: ${props => props.theme.CTAColor};
      font-size: 2.5rem;
    }
    .favtrucks {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
`;

export default StyledDinerDashboard;
