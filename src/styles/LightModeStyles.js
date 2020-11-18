import styled from "styled-components";

export const LocateBtn = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  padding: ${({ theme }) => theme.padding};
  margin: ${({ theme }) => theme.margin};
  font-size: ${({ theme }) => theme.fontSizes.small};
  border: none;
`;
