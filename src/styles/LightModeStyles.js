import styled from "styled-components";
import Login from "../components/Login";

// Locate button
export const LocateBtn = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  padding: ${({ theme }) => theme.padding};
  margin: ${({ theme }) => theme.margin};
  font-size: ${({ theme }) => theme.fontSizes.small};
  border: none;
`;

//Login page
export const LoginBodyStyle = styled.div`
  color: ${({ theme }) => theme.textColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100vh;

  .loginTitle {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin: ${({ theme }) => theme.margin};
  }

  .loginForm {
    margin: ${({ theme }) => theme.margin};
  }

  input {
    margin-left: ${({ theme }) => theme.margin};
  }

  .loginLink {
    margin: ${({ theme }) => theme.margin};
    color: ${({ theme }) => theme.textColor};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

export const LoginBtn = styled(LocateBtn)`
  background-color: ${({ theme }) => theme.accentColor};
  color: ${({ theme }) => theme.whiteColor};
`;

// menu item page
export const MenuBodyStyle = styled(LoginBodyStyle)`
  .menuTitle {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin: ${({ theme }) => theme.margin};
  }
  .menuForm {
    margin: ${({ theme }) => theme.margin};
  }
`;

export const AddItemBtn = styled(LoginBtn)``;
