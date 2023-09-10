import React from "react";
import styled from "styled-components";

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const EmptyView = ({ msg }) => {
  return <NoData>{msg}</NoData>;
};

export default EmptyView;
