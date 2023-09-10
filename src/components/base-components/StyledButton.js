import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.primary
      ? `
      background-color: #153815;
      color: #fff;
      border: none;
      
      &:hover {
        opacity: 0.9;
      }
    `
      : `
      background-color: #fff;
      color: #153815;
      border: 1px solid #153815;
      
      &:hover {
        opacity: 0.9;
      }
    `}
`;

const StyledButton = ({ primary, onClick, disabled, children }) => {
  return (
    <StyledBtn primary={primary} onClick={onClick} disabled={disabled}>
      {children}
    </StyledBtn>
  );
};

export default StyledButton;
