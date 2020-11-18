import styled from 'styled-components';

const WelcomeStyle = styled.h2`
font-size: 2.4rem;
padding: 1rem;
background:  ${(props) => props.theme.backgroundColor};
color:  ${(props) => props.theme.textColor};

`

export default WelcomeStyle;