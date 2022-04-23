import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Button = styled(LinkRouter)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#64DADF" : "#010606")};
  white-space: npwrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.25s ease-in-out;
  text-decoration: None;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#64dadf")};
  }
`;
