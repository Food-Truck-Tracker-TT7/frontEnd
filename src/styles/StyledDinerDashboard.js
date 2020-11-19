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
      background-color: ${props => props.theme.backgroundColor};
      font-size: 2.5rem;
    }
    .favtrucks {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
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
  p {
    margin: 1%;
  }
`;

export default StyledDinerDashboard;
